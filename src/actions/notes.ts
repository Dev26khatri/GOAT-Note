"use server";

import { getUser } from "@/auth/server";
import { prisma } from "@/lib/prisma";
import { handleError } from "@/lib/utils";

export const updateNoteAction = async (noteId: string, text: string) => {
  try {
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        text,
      },
    });
    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const createNoteAction = async (noteId: string) => {
  try {
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    await prisma.note.create({
      data: {
        id: noteId,
        authorId: user.id,
        text: "",
      },
    });
    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};
