import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Textarea from "react-textarea-autosize";
import { Send } from "lucide-react";
import React, {
  ChangeEvent,
  FormEvent,
  RefObject,
  useEffect,
  useRef,
} from "react";

interface InputFieldProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  input: string;
  formRef: RefObject<HTMLFormElement>;
  children: React.ReactNode;
}
export default function InputField({
  handleChange,
  handleSubmit,
  input,
  formRef,
  onKeyDown,
  children,
}: InputFieldProps) {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }, []);
  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <div className="relative flex items-center  dark:bg-zinc-950/80  rounded-2xl border shadow-md p-0">
        {children}
        <Textarea
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Enter a message."
          className="min-h-[60px]    w-full resize-none bg-transparent px-12 py-4 focus-within:outline-none "
          autoFocus
          spellCheck={false}
          ref={inputRef}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          onChange={handleChange}
          value={input}
        />
        <div className="absolute right-0 top-[13px] sm:right-4 px-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"ghost"}
                disabled={input.trim() === ""}
                type="submit"
                size="icon"
              >
                <Send size={22} />
                <span className="sr-only">Send</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  );
}
