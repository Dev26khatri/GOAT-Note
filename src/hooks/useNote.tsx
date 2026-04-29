"use client";

import { NoteContext } from "@/providers/NoteProvider";
import { useContext } from "react";

function useNote() {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNote must be used within a NoteProvider");
  }
  return context;
}
export default useNote;
