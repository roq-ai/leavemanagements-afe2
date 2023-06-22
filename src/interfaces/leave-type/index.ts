import { LeaveRequestInterface } from 'interfaces/leave-request';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface LeaveTypeInterface {
  id?: string;
  name: string;
  company_id: string;
  created_at?: any;
  updated_at?: any;
  leave_request?: LeaveRequestInterface[];
  company?: CompanyInterface;
  _count?: {
    leave_request?: number;
  };
}

export interface LeaveTypeGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  company_id?: string;
}
