import { EMAIL_REGEX, PASSWORD_REGEX } from '../../contants/regularExpressions';
import * as Yup from 'yup';

export const InitialRegisterData = {
  name: '',
  email: '',
  password: '',
  mobile: ''
};

export const RegisterSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().required('Email is required').email('Enter valid email').matches(EMAIL_REGEX, 'Invalid email'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(PASSWORD_REGEX, 'Password must contain at least 1 capital letter, number and special character')
});
