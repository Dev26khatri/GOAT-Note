"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { Textarea } from "./ui/textarea";
import { debounce } from "@/lib/constant";
import useNote from "@/hooks/useNote";
import { updateNoteAction } from "@/actions/notes";

type Props = {
  noteId: string;
  startingNoteText?: string;
};

let updateTimeOut: NodeJS.Timeout;

const NoteTextInput = ({ noteId, startingNoteText }: Props) => {
  const nodeIdParams = useSearchParams().get("noteId") || noteId;
  const { noteText, setNoteText } = useNote();

  useEffect(() => {
    if (nodeIdParams === noteId) {
      setNoteText(startingNoteText || "");
    }
  }, [nodeIdParams, noteId, setNoteText, startingNoteText]);

  const handleUpdateNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;

    setNoteText(text);

    clearTimeout(updateTimeOut);
    updateTimeOut = setTimeout(() => {
      updateNoteAction(noteId, text);
    }, debounce);
  };

  return (
    <Textarea
      value={noteText}
      onChange={handleUpdateNote}
      placeholder="Type your notes here...(Firstly click the New Note button to create a note after you write your note, you can see the changes in real-time without clicking any save button)"
      className="placeholder:text-muted-foreground   h-full max-w-4xl resize-none border-0 bg-transparent p-4 focus:ring-0 sm:text-sm"
    />
  );
};

export default NoteTextInput;
