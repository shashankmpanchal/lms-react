import { EMAIL_REGEX } from '../../contants/regularExpressions';
import * as Yup from 'yup';

export const InitialLeaveData = {
  leave: 'Casual leave',
  fromDate: '',
  toDate: ''
};

export const LeaveSchema = Yup.object({
  fromDate: Yup.string().required('From date is required'),
  toDate: Yup.string().required('To date is required'),
});
