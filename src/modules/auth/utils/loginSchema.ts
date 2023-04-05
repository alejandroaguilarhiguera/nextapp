import * as yup from 'yup';
import Login from '~/modules/auth/types/Login';

const schema = yup.object({
  identifier: yup.string().email('Invalid email').required('Enter your email address'),
  password: yup.string().required('Enter you password').min(6, 'Incorrect password'),
});

export default schema;
