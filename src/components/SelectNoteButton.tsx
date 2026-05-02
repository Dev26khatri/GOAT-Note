import { Note } from "@/generated/prisma/client";
import useNote from "@/hooks/useNote";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SidebarMenuButton } from "./ui/sidebar";
import Link from "next/link";

type Props = {
  note: Note;
};

const SelectNoteButton = ({ note }: Props) => {
  const noteId = useSearchParams().get("noteId") || "";
  const { noteText: selectNoteText } = useNote();
  const [localNote, setLocalNote] = useState(note.text);
  const [shouldGloablNoteText, setShouldGlobalNoteText] = useState(false);

  useEffect(() => {
    if (noteId === note.id) {
      setShouldGlobalNoteText(true);
    } else {
      setShouldGlobalNoteText(false);
    }
  }, [noteId, note.id]);

  useEffect(() => {
    if (shouldGloablNoteText) {
      setLocalNote(selectNoteText);
    }
  }, [selectNoteText, shouldGloablNoteText]);

  const blankNoteText = "EMPTY NOTE";
  let NoteText = localNote || blankNoteText;
  if (shouldGloablNoteText) {
    NoteText = selectNoteText || blankNoteText;
  }

  return (
    <SidebarMenuButton
      className={`items-start h-fit gap-0 pr-12 ${note.id === noteId && "bg-sidebar-accent/50"}`}
    >
      <Link href={`/?noteId=${note.id}`} className="flex  flex-col">
        <p className="w-full truncate whitespace-nowrap overflow-hidden max-w-44">
          {NoteText}
        </p>
        <p className="text-muted-foreground/40 text-xs">
          {note.updatedAt?.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "2-digit",
          })}
        </p>
      </Link>
    </SidebarMenuButton>
  );
};

export default SelectNoteButton;
