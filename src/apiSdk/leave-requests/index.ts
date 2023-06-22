import axios from 'axios';
import queryString from 'query-string';
import { LeaveRequestInterface, LeaveRequestGetQueryInterface } from 'interfaces/leave-request';
import { GetQueryInterface } from '../../interfaces';

export const getLeaveRequests = async (query?: LeaveRequestGetQueryInterface) => {
  const response = await axios.get(`/api/leave-requests${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createLeaveRequest = async (leaveRequest: LeaveRequestInterface) => {
  const response = await axios.post('/api/leave-requests', leaveRequest);
  return response.data;
};

export const updateLeaveRequestById = async (id: string, leaveRequest: LeaveRequestInterface) => {
  const response = await axios.put(`/api/leave-requests/${id}`, leaveRequest);
  return response.data;
};

export const getLeaveRequestById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/leave-requests/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteLeaveRequestById = async (id: string) => {
  const response = await axios.delete(`/api/leave-requests/${id}`);
  return response.data;
};
