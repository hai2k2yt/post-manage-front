// @flow
import * as React from 'react';
import Link from "next/link";
import SignInForm from "@/app/auth/signin/_components/sign-in-form";
import {Button} from "@/components/ui/button";
import {BACKEND_URL} from "@/lib/constants";


const SignInPage = () => {
  return (
    <div className="bg-white p-8 border rounded-md gap-3 shadow-md w-96 flex flex-col justify-center items-center">
      <h1 className="text-center text-2xl font-bold mb-4">
        Sign in page
      </h1>
      <SignInForm />
      <Link href="/auth/forgot">Forgot password</Link>
      <Button>
        <a href={`${BACKEND_URL}/auth/google/login`}>
          Sign in with Google
        </a>
      </Button>
    </div>
  );
};

export default SignInPage