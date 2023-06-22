import axios from 'axios';
import queryString from 'query-string';
import { LeaveTypeInterface, LeaveTypeGetQueryInterface } from 'interfaces/leave-type';
import { GetQueryInterface } from '../../interfaces';

export const getLeaveTypes = async (query?: LeaveTypeGetQueryInterface) => {
  const response = await axios.get(`/api/leave-types${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createLeaveType = async (leaveType: LeaveTypeInterface) => {
  const response = await axios.post('/api/leave-types', leaveType);
  return response.data;
};

export const updateLeaveTypeById = async (id: string, leaveType: LeaveTypeInterface) => {
  const response = await axios.put(`/api/leave-types/${id}`, leaveType);
  return response.data;
};

export const getLeaveTypeById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/leave-types/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteLeaveTypeById = async (id: string) => {
  const response = await axios.delete(`/api/leave-types/${id}`);
  return response.data;
};
