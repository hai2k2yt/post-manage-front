"use server"

import {SignUpFormState} from "@/lib/types/formState";
import {SignUpFormSchema} from "@/lib/zodSchemas/signUpFormSchema";
import {fetchGraphQL} from "@/lib/fetchGraphQL";
import {print} from "graphql"
import {CREATE_USER_MUTATION, SIGN_IN_MUTATION} from "@/lib/gqlQueries";
import {redirect} from "next/navigation";
import {LoginFormSchema} from "@/lib/zodSchemas/loginFormSchema";
import {revalidatePath} from "next/cache";

export async function signUp(
  state: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  const validatedFields = SignUpFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  )

  if (!validatedFields.success) {
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors
    } as SignUpFormState
  }

  const data = await fetchGraphQL(print(CREATE_USER_MUTATION), {
    input: {
      ...validatedFields.data
    }
  })

  if (data.errors) return {
    data: Object.fromEntries(formData.entries()),
    message: "Something went wrong"
  } as SignUpFormState

  redirect("/auth/signin")
  return {} as never
}

export async function signIn(
  state: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  const validatedFields = LoginFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  )

  if (!validatedFields.success) {
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors
    } as SignUpFormState
  }

  const data = await fetchGraphQL(print(SIGN_IN_MUTATION), {
    input: {
      ...validatedFields.data
    }
  })

  if (data.errors) return {
    data: Object.fromEntries(formData.entries()),
    message: "Invalid credentials"
  } as SignUpFormState

  revalidatePath("/")
  redirect("/")
}