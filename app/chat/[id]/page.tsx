import Chat from "@/components/chat";
import AIProvider from "@/components/providers/ai-provider";
import { getChat } from "@/lib/actions/server";
import { type Chat as TChat } from "@/lib/types";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { capitalize } from "@/lib/utils";
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  const chat = (await getChat(id)) as unknown as TChat;
  if (!chat) notFound();
  return {
    title: capitalize(chat.title),
    description: chat?.title
  };
}
export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const chat = (await getChat(id)) as unknown as TChat;
  if (!chat) notFound();
  return (
    <AIProvider initialAIState={{ chatId: chat.id, messages: chat.messages }}>
      <div className="w-full ">
        <Chat chatId={chat.id} initialMessages={chat.messages} />
      </div>
    </AIProvider>
  );
}
