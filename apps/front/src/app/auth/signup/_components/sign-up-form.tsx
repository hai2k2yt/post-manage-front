// @flow

"use client"
import * as React from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import SubmitButton from "@/components/submit-button";
import {useActionState} from "react";
import {signUp} from "@/lib/actions/auth";

const SignUpForm = () => {
  const [state, action] = useActionState(signUp, undefined)

  return (
    <form action={action} className="flex flex-col gap-2">
      {
        !!state?.message && (
          <p className="text-red-500 text-sm">{state.message}</p>
        )
      }
      <div>
        <Label htmlFor="name">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="Name"
          defaultValue={state?.data.name}
        />
        {
          !!state?.errors?.name && (
            <p className="text-red-500 text-sm">{state.errors.name}</p>
          )
        }
      </div>

      <div>
        <Label htmlFor="email">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          placeholder="Email"
          defaultValue={state?.data.email}
        />
        {
          !!state?.errors?.email && (
            <p className="text-red-500 text-sm">{state.errors.email}</p>
          )
        }
      </div>

      <div>
        <Label htmlFor="password">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          defaultValue={state?.data.password}
        />
        {
          !!state?.errors?.password && (
            <div className="text-sm text-red-500">
              <p>Password must: </p>
              <ul>
                {state.errors.password.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            </div>
          )
        }
      </div>

      <SubmitButton>Sign Up</SubmitButton>
    </form>
  );
};

export default SignUpForm