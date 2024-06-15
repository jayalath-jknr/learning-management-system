import React from 'react';
import { useSignUp } from '@clerk/clerk-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  name: Yup.string().min(2, 'Too Short!').required('Required'),
  password: Yup.string().min(8, 'Password too short').required('Required'),
});

const Register = () => {
  const { signUp } = useSignUp();

  const handleSignUp = async (values) => {
    try {
      await signUp.create({
        emailAddress: values.email,
        password: values.password,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', name: '', password: '' }}
      validationSchema={SignupSchema}
      onSubmit={handleSignUp}
    >
      {() => (
        <Form>
          <Field name="email" type="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" />

          <Field name="name" type="text" placeholder="Name" />
          <ErrorMessage name="name" component="div" />

          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" component="div" />

          <button type="submit">Sign Up</button>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
