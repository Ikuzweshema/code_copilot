"use client";
import React, { Suspense, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "ai/react";
import InputField from "@/components/chat/input-field";
import Messages from "@/components/chat/messages";
import { Attachment } from "@prisma/client";
import UploadDialog from "@/components/chat/upload-dialog";
import ScrollAnchor from "./scroll-to-bottom";
import EmptyScreen from "./empty-messages";
import { Message } from "ai";
import { useLocalStorage, useScroll } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { useSWRConfig } from "swr";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { useIsMobile } from "@/lib/hooks/use-mobile";

interface ChatProps {
  initialMessages: Message[];
  chatId: string;
  chatTitle?: string;
}
export default function Chat({
  chatId,
  initialMessages,
  chatTitle,
}: ChatProps) {
  const [_new, setChatId] = useLocalStorage<string | null>("chatId", null);
  const { mutate } = useSWRConfig();
  const path = usePathname();
  const [attachment, setAttachment] = useState<Attachment | undefined>(
    undefined
  );
  const {
    handleSubmit,
    handleInputChange,
    input,
    append,
    stop,
    error,
    isLoading,
    reload,
    messages,
  } = useChat({
    initialMessages: initialMessages,
    id: chatId,
    body: {
      id: chatId,
    },
    onFinish: () => {
      const isNew = !path.includes(chatId);
      if (isNew) {
        history.pushState({}, "", `/chat/${chatId}`);
        setChatId(chatId);
        mutate("/api/chats");
      }
    },
  });
  const isEmpty = messages.length === 0;
  const {
    isAtBottom,
    scrollToBottom,
    messagesRef,
    visibilityRef,
    handleScroll,
  } = useScroll();
  const isMobile = useIsMobile();
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {isMobile && !isEmpty && (
        <div className="w-fit h-10 flex gap-10 justify-start mb-3 mx-0 pl-0 absolute top-1 right-1 z-10">
          <span className="text-sm">
            {chatTitle
              ? chatTitle?.length > 35
                ? chatTitle?.slice(0, 30) + "..."
                : chatTitle
              : "Unititled Chat"}
          </span>
          <Button asChild size="sm">
            <Link href="/">New Chat</Link>
          </Button>
        </div>
      )}
      {isEmpty ? (
        <EmptyScreen append={append} />
      ) : (
        <>
          <ScrollArea
            onScrollCapture={handleScroll}
            className="flex-grow w-full overflow-y-auto mt-3"
          >
            <div
              ref={visibilityRef}
              className="min-h-full w-full flex flex-col  lg:max-w-2xl mx-auto p-1  "
            >
              <Messages
                error={error}
                loading={isLoading}
                ref={messagesRef}
                messages={messages}
                reload={reload}
              />
            </div>
          </ScrollArea>
          <div className="mx-auto flex justify-center items-center pb-2 pt-0 z-10">
            <ScrollAnchor
              isAtBottom={isAtBottom}
              scrollToBottom={scrollToBottom}
            />
          </div>
        </>
      )}
      <div className={cn("w-full", isEmpty ? "" : "mb-8")}>
        <div className={cn("mx-auto p-2", isEmpty ? "max-w-2xl" : "max-w-xl")}>
          <div className="w-full">
            <InputField
              stop={stop}
              isLoading={isLoading}
              input={input}
              handleSubmit={handleSubmit}
              handleChange={handleInputChange}
            >
              <Suspense fallback={null}>
                <UploadDialog
                  attachment={attachment}
                  chatId={chatId}
                  setAttachment={setAttachment}
                />
              </Suspense>
            </InputField>
          </div>
        </div>
      </div>
    </div>
  );
}
