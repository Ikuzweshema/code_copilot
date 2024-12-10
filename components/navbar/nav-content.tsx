"use client";
import React, { Suspense } from "react";
import { IconOpenAI} from "../ui/icons";
import { ScrollArea } from "../ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarHeader,
  useSidebar,
} from "../ui/sidebar";
import UserButton from "./user";
import { History, MessageSquarePlus } from "lucide-react";
import Link from "next/link";
import NavLinks from "./nav-links";
import { Session } from "next-auth";

interface Props {
  children: React.ReactNode;
  sessionPromise: Promise<Session | null>;
}

export default function NavContent({ children, sessionPromise }: Props) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  return (
    <Sidebar
      data-collapsed={collapsed}
      variant="sidebar"
      collapsible={"icon"}
      className="group px-0 "
    >
      <SidebarHeader className="p-2 space-y-2 border-b">
        <Link href={"/"} className="flex items-center gap-1">
        <div className="text-primary-foreground bg-primary rounded-md size p-0.5">
        <IconOpenAI size={28} />
        </div>
       
          <span className="font-semibold text-center text-xl group-data-[collapsible=icon]:hidden">
            Code Copilot
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="mt-4">
        <ScrollArea className="flex-grow">
          <NavLinks />
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel className="flex text-sm text-muted-foreground  items-center py-1">
              <History className="h-4 w-4" />
              Recent Chats
            </SidebarGroupLabel>
            <SidebarGroupAction title="New chat" asChild>
              <Link href={"/"}>
                <MessageSquarePlus className="h-4 w-4" />
                <span className="sr-only text- ">New chat</span>
              </Link>
            </SidebarGroupAction>
            {children}
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <Suspense fallback={null}>
          <UserButton sessionPromise={sessionPromise} />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  );
}
