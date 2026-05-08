"use server";

import { getUser } from "@/auth/server";
import { prisma } from "@/lib/prisma";
import { handleError } from "@/lib/utils";
import openAi from "@/OpenAi";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

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

export const deleteNoteAction = async (noteId: string) => {
  try {
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }
    await prisma.note.delete({
      where: { id: noteId },
    });
    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const askAiAboutNoteAction = async (
  newQuestions: string[],
  responses: string[],
) => {
  try {
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const notes = await prisma.note.findMany({
      where: { authorId: user.id },
      orderBy: { createdAt: "desc" },
      select: { text: true, createdAt: true, updatedAt: true },
    });
    if (notes.length === 0) {
      return "You don't have any notes yet. Please create a note and ask again.";
    }

    const formattedNotes = notes
      .map((note) =>
        `Text:${note.text}
      Created At: ${note.createdAt}
      Last Updated At: ${note.updatedAt}
      `.trim(),
      )
      .join("\n");

    const messages: ChatCompletionMessageParam[] = [
      {
        role: "developer",
        content: `
          You are a helpful assistant that answers questions about a user's notes. 
          Assume all questions are related to the user's notes. 
          Also provide suggestions on how to improve the notes if relevant.
          And showing more in detailst information about the notes if relevant.
          Make sure that your answers are not too verbose and you speak succinctly. 
          Your responses MUST be formatted in clean, valid HTML with proper structure. 
          Use tags like <p>, <strong>, <em>, <ul>, <ol>, <li>, <h1> to <h6>, and <br> when appropriate. 
          Do NOT wrap the entire response in a single <p> tag unless it's a single paragraph. 
          Avoid inline styles, JavaScript, or custom attributes.
          
          Rendered like this in JSX:
          <p dangerouslySetInnerHTML={{ __html: YOUR_RESPONSE }} />
    
          Here are the user's notes:
          ${formattedNotes}
          `,
      },
    ];

    for (let i = 0; i < newQuestions.length; i++) {
      messages.push({
        role: "user",
        content: newQuestions[i],
      });
      if (responses.length > i) {
        messages.push({
          role: "assistant",
          content: responses[i],
        });
      }
    }
    
    const completion = await openAi.chat.completions.create({
      model: "meta/llama-3.3-70b-instruct",
      messages,
    });
    return (
      completion.choices[0].message.content ||
      "Sorry, I couldn't generate a response. Please try again."
    );
  } catch (error) {
    return handleError(error);
  }
};
