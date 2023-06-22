import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { leaveTypeValidationSchema } from 'validationSchema/leave-types';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getLeaveTypes();
    case 'POST':
      return createLeaveType();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getLeaveTypes() {
    const data = await prisma.leave_type
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'leave_type'));
    return res.status(200).json(data);
  }

  async function createLeaveType() {
    await leaveTypeValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.leave_request?.length > 0) {
      const create_leave_request = body.leave_request;
      body.leave_request = {
        create: create_leave_request,
      };
    } else {
      delete body.leave_request;
    }
    const data = await prisma.leave_type.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
