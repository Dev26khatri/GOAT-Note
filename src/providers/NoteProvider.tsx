"use client";

import { createContext, useState } from "react";

type NoteContextType = {
  noteText: string;
  setNoteText: (noteText: string) => void;
};
export const NoteContext = createContext<NoteContextType>({
  noteText: "",
  setNoteText: () => {},
});

function NoteProvdier({ children }: { children: React.ReactNode }) {
  const [noteText, setNoteText] = useState("");
  return (
    <NoteContext.Provider value={{ noteText, setNoteText }}>
      {children}
    </NoteContext.Provider>
  );
}
export default NoteProvdier;
