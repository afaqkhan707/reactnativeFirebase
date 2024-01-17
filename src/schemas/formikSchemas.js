import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
});

export const signupSchema = Yup.object({
  name: Yup.string().min(2).max(20).required('Please Enter Your Name'),
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
  confirm_password: Yup.string() // <-- Add parentheses here
    .required('Required')
    .oneOf([Yup.ref('password'), null], 'Password must Match...'),
});
