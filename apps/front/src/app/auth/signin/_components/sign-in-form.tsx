// @flow
"use client"

import * as React from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import SubmitButton from "@/components/submit-button";
import {useActionState} from "react";
import {signIn} from "@/lib/actions/auth";


const SignInForm = () => {
  const [state, action] = useActionState(signIn, undefined)

  return (
    <form action={action} className="flex flex-col gap-2">
      {!!state?.message && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="email"
          type="email"
          defaultValue={state?.data.email}
        />
        {!!state?.errors.email && (
          <p className="text-red-500 text-sm">{state?.errors.email}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          placeholder="password"
          type="password"
          defaultValue={state?.data.password}
        />
        {!!state?.errors.password && (
          <p className="text-red-500 text-sm">{state?.errors.password}</p>
        )}
      </div>
      <SubmitButton>Sign in</SubmitButton>
    </form>
  );
};

export default SignInForm