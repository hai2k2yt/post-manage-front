// @flow 
import * as React from 'react';
import Link from "next/link";
import SignUpForm from "@/app/auth/signup/_components/sign-up-form";

const SignUpPage = () => {
  return (
    <div className="bg-white p-8 rounded-md shadow-md w-96 flex flex-col justify-center items-center">
      <h2 className="text-center text-2xl font-bold mb-4">
        Sign up page
      </h2>
      <SignUpForm />
      <div>
        <p>Already have an account?</p>
        <Link className="underline" href="/auth/signin">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage