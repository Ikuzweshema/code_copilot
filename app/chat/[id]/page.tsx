import Chat from "@/components/chat";
import AIProvider from "@/components/providers/ai-provider";
import { getChat } from "../../../lib/actions/server";
import { type Chat as TChat } from "@/lib/types";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const chat = (await getChat(id)) as unknown as TChat;
  if (!chat) notFound();
  return (
    <AIProvider initialAIState={{ chatId: id, messages: chat.messages }}>
      <div className="w-full ">
        <Chat chatId={id} initialMessages={chat.messages} />
      </div>
    </AIProvider>
  );
}