"use server";

import { createClient } from "@/auth/server";
import { prisma } from "@/lib/prisma";
import { handleError } from "@/lib/utils";
import { cookies } from "next/headers";

export async function loginAction(email: string, password: string) {
  try {
    const { auth } = await createClient();
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
    const { auth } = await createClient();
    const { data, error } = await auth.signUp({
      email,
      password,
      options:{
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`
      }
    });
    if (error) throw error;
    
    const userId = data?.user?.id;
    if (!userId) throw new Error("Error Singning up");
    await prisma.user.create({
      data: {
        id: data.user?.id!,
        email: data.user?.email!,
      },
    });
    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
}
export async function LogoutAction() {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signOut();

    if (error) throw error;
    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
}
