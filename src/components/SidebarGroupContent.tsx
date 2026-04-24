import { Note } from "@/generated/prisma/client";
import React from "react";

type Props = {
  notes: Note[];
};

const SidebarGroupContent = ({ notes }: Props) => {
  console.log(notes);
  return <div>Your notes is here </div>;
};

export default SidebarGroupContent;
