import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const SignInStudent = () => {
  return (
    <div>
      <SignIn path="/sign-in-student" routing="path" signUpUrl="/register" afterSignInUrl="/dashboard" />
    </div>
  );
};

export default SignInStudent;
