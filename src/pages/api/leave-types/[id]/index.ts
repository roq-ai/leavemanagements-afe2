import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { leaveTypeValidationSchema } from 'validationSchema/leave-types';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.leave_type
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getLeaveTypeById();
    case 'PUT':
      return updateLeaveTypeById();
    case 'DELETE':
      return deleteLeaveTypeById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getLeaveTypeById() {
    const data = await prisma.leave_type.findFirst(convertQueryToPrismaUtil(req.query, 'leave_type'));
    return res.status(200).json(data);
  }

  async function updateLeaveTypeById() {
    await leaveTypeValidationSchema.validate(req.body);
    const data = await prisma.leave_type.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteLeaveTypeById() {
    const data = await prisma.leave_type.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
