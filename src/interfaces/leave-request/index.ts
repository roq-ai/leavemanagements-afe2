import { LeaveTypeInterface } from 'interfaces/leave-type';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface LeaveRequestInterface {
  id?: string;
  start_date: any;
  end_date: any;
  status: string;
  leave_type_id: string;
  employee_id: string;
  manager_id: string;
  created_at?: any;
  updated_at?: any;

  leave_type?: LeaveTypeInterface;
  user_leave_request_employee_idTouser?: UserInterface;
  user_leave_request_manager_idTouser?: UserInterface;
  _count?: {};
}

export interface LeaveRequestGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  leave_type_id?: string;
  employee_id?: string;
  manager_id?: string;
}
