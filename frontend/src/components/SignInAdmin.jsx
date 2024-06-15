import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const SignInAdmin = () => {
  return (
    <div>
      <SignIn path="/sign-in-admin" routing="path" signUpUrl="/register" afterSignInUrl="/dashboard" />
    </div>
  );
};

export default SignInAdmin;
