"use server";

import { createClient } from "@/auth/server";
import { handleError } from "@/lib/utils";
import { cookies } from "next/headers";

export async function loginAction(email: string, password: string) {
  try {
    const cookiesStore = await cookies();
    const { auth } = await createClient(cookiesStore);
    const { error } = await auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
}
export async function signupAction(email: string, password: string) {
  try {
    const cookiesStore = await cookies();
    const { auth } = await createClient(cookiesStore);
    const { data, error } = await auth.signUp({
      email,
      password,
    });
    if (error) throw error;

    const userId = data?.user?.id;
    if (!userId) throw new Error("Error Singning up");
    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
}
export async function LogoutAction() {
  try {
    const cookieStore = await cookies();
    const { auth } = await createClient(cookieStore);
    const { error } = await auth.signOut();

    if (error) throw error;
    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
}
