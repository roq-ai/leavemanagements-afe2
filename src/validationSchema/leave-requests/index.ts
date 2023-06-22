import * as yup from 'yup';

export const leaveRequestValidationSchema = yup.object().shape({
  start_date: yup.date().required(),
  end_date: yup.date().required(),
  status: yup.string().required(),
  leave_type_id: yup.string().nullable().required(),
  employee_id: yup.string().nullable().required(),
  manager_id: yup.string().nullable().required(),
});
