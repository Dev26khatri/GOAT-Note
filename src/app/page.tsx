import { getUser } from "@/auth/server";
import AskAIButton from "@/components/AskAIButton";
import NewNoteButton from "@/components/NewNoteButton";
import NoteTextInput from "@/components/NoteTextInput";
import { prisma } from "@/lib/prisma";
import React from "react";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
const HomePage = async ({ searchParams }: Props) => {
  const user = await getUser();
  const noteIdParam = await searchParams.then((params) => params.noteId);

  const NoteId = Array.isArray(noteIdParam)
    ? noteIdParam[0]
    : noteIdParam || "";

  const note = await prisma.note.findUnique({
    where: { id: NoteId, authorId: user?.id },
  });

  return (
    <div className="flex h-full flex-col items-center gap-4">
      <div className="flex w-full max-w-4xl justify-end gap-4">
        <AskAIButton user={user} />
        <NewNoteButton user={user} />
      </div>
      <NoteTextInput noteId={NoteId} />
    </div>
  );
};

export default HomePage;
