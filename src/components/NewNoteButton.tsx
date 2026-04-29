"use client";
import { User } from "@supabase/supabase-js";
import React, { use, useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { createNoteAction } from "@/actions/notes";
import { debounce } from "@/lib/constant";

type Props = {
  user: User | null;
};

const NewNoteButton = ({ user }: Props) => {
  const [IsLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleNewNoteButton = async () => {
    try {
      if (!user) {
        router.push("/login");
      }
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, debounce + 500));

      const uuid = uuidv4();
      await createNoteAction(uuid);
      router.push(`/?noteId=${uuid}`);

      toast.success("Note created successfully!");
    } catch (error) {
      toast.error("Failed to create note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      onClick={handleNewNoteButton}
      variant={"secondary"}
      className="w-24"
      disabled={!user || IsLoading}
    >
      {IsLoading ? <Loader2 className="animate-spin" /> : "New Note"}
    </Button>
  );
};

export default NewNoteButton;
