"use server";

import { createClient } from "@/auth/server";
import { prisma } from "@/lib/prisma";
import { handleError } from "@/lib/utils";

export async function loginAction(email: string, password: string) {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signInWithPassword({ email, password });
    if (error) return { errorMessage: error.message };
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
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      },
    });

    if (error) return { errorMessage: error.message };

    const userId = data?.user?.id;
    const userEmail = data?.user?.email;

    if (!userId || !userEmail)
      return { errorMessage: "Signup failed: no user returned" };

    // Check if user already exists before creating
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!existingUser) {
      await prisma.user.create({ data: { id: userId, email: userEmail } });
    }

    return { errorMessage: null };
  } catch (error: any) {
    return { errorMessage: error?.message || String(error) };
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
