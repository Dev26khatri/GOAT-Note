"use client";
import { Note } from "@/generated/prisma/client";
import { SearchIcon } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Input } from "./ui/input";
import Fuse from "fuse.js";
import { SidebarMenu, SidebarMenuItem } from "./ui/sidebar";
import SelectNoteButton from "./SelectNoteButton";
import DeleteNoteButton from "./DeleteNoteButton";
import { useSearchParams } from "next/navigation";

type Props = {
  notes: Note[];
};

const SidebarGroupContent = ({ notes }: Props) => {
  const [searchText, setSearchText] = useState("");
  const [localNotes, setLocalNotes] = useState(notes);
  const noteIdParam = useSearchParams().get("noteId") || "";

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  // ✅ Optimistically add new note to sidebar if it doesn't exist yet
  useEffect(() => {
    if (!noteIdParam) return;
    const exists = localNotes.some((note) => note.id === noteIdParam);
    if (!exists) {
      const optimisticNote: Note = {
        id: noteIdParam,
        text: "",
        authorId: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setLocalNotes((prev) => [optimisticNote, ...prev]);
    }
  }, [noteIdParam]);

  const fuse = useMemo(() => {
    return new Fuse(localNotes, {
      keys: ["title"],
      threshold: 0.3,
    });
  }, [localNotes]);

  const filteredNotes = searchText
    ? fuse.search(searchText).map((result) => result.item)
    : localNotes;

  const deleteNoteLocally = (noteId: string) => {
    setLocalNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== noteId),
    );
  };

  return (
    <div>
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-2 size-3" />
        <Input
          className="bg-muted-2 pl-8"
          placeholder="Search Your Notes.."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <SidebarMenu className="mt-4">
        {filteredNotes.map((note) => (
          <SidebarMenuItem key={note.id} className="group/item">
            <SelectNoteButton note={note} />
            <DeleteNoteButton
              noteId={note.id}
              deleteNoteLocally={deleteNoteLocally}
            />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  );
};

export default SidebarGroupContent;
