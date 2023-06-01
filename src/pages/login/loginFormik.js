import { EMAIL_REGEX } from '../../contants/regularExpressions';
import * as Yup from 'yup';

export const InitialLoginData = {
  email: '',
  password: ''
};

export const LoginSchema = Yup.object({
  email: Yup.string().required('Email is required').email('Enter valid email').matches(EMAIL_REGEX, 'Invalid email'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
});
