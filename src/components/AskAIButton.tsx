"use client";
import { User } from "@supabase/supabase-js";
import React, { Fragment, useRef, useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import { ArrowUpIcon } from "lucide-react";
import { askAiAboutNoteAction } from "@/actions/notes";
import "@/style/ai-response.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

type Props = {
  user: User | null;
};

const AskAIButton = ({ user }: Props) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [response, setResponse] = useState<string[]>([]);

  const handleOnOpenChange = (isOpen: boolean) => {
    if (!user) {
      router.push("/login");
    } else {
      if (isOpen) {
        setQuestionText("");
        setQuestions([]);
        setResponse([]);
      }
      setOpen(isOpen);
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleClickInput = () => {
    textareaRef.current?.focus();
  };
  const handleSubmit = () => {
    if (!questionText.trim()) return;
    const newQuestions = [...questions, questionText];
    setQuestions(newQuestions);
    setQuestionText("");
    setTimeout(scrollToBottom, 100);

    startTransition(async () => {
      const result = await askAiAboutNoteAction(newQuestions, response);
      const responseText =
        typeof result === "string" ? result : result.errorMessage;
      setResponse((prev: string[]) => [...prev, responseText]);
      setTimeout(scrollToBottom, 100);
    });
  };
  const scrollToBottom = () => {
    contentRef.current?.scrollTo({
      top: contentRef.current.scrollHeight,
      behavior: "smooth",
    });
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={handleOnOpenChange}>
        <DialogTrigger className="rounded-md bg-secondary px-4 py-1.5 hover:bg-secondary/80" >
          Ask To AI
        </DialogTrigger>

        <DialogContent className="flex h-[85vh] w-[90vw] max-w-6xl flex-col overflow-hidden p-0">
          {/* Header */}
          <div className="border-b px-6 py-4">
            <DialogTitle className="text-lg font-semibold">
              AI Assistant
            </DialogTitle>

            <DialogDescription className="text-sm text-muted-foreground">
              Ask anything about your notes
            </DialogDescription>
          </div>

          {/* Messages */}
          <div className="custom-scrollbar flex-1 overflow-y-auto px-6 py-4">
            <div className="flex flex-col gap-6">
              {questions.map((question, index) => (
                <Fragment key={index}>
                  {/* User Message */}
                  <div className="ml-auto max-w-[80%]">
                    <div className="rounded-2xl bg-muted px-4 py-3 text-sm">
                      {question}
                    </div>
                  </div>

                  {/* AI Message */}
                  {response[index] && (
                    <div className="max-w-[90%]">
                      <div
                        className="bot-response text-sm leading-7 text-foreground"
                        dangerouslySetInnerHTML={{
                          __html: response[index],
                        }}
                      />
                    </div>
                  )}
                </Fragment>
              ))}

              {/* Loading */}
              {isPending && (
                <Accordion className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="animate-pulse text-sm text-muted-foreground underline-none">
                      Thinking...
                    </AccordionTrigger>
                    <AccordionContent>
                      Waiting for the AI to respond. This usually takes around
                      30 seconds, but can sometimes take up to a minute
                      depending on the complexity of the question and the
                      current load on the AI servers. Thank you for your
                      patience!
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t bg-background p-4">
            <div
              onClick={handleClickInput}
              className="flex items-end gap-3 rounded-3xl border bg-background 
          px-4 py-3 shadow-sm transition-all focus-within:ring-1 focus-within:ring-ring
        "
            >
              <Textarea
                ref={textareaRef}
                placeholder="Ask me anything..."
                value={questionText}
                rows={1}
                onChange={(e) => setQuestionText(e.target.value)}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                className="
            max-h-40  min-h-[24px] flex-1 resize-none border-0 bg-transparent p-2 text-sm leading-6 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />

              <Button
                size="icon"
                disabled={!questionText.trim()}
                className="h-9 w-9 rounded-full"
                onClick={handleSubmit}
              >
                <ArrowUpIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AskAIButton;
