"use client";

import Link from "next/link";
import {MessageSquarePlus, Package2 } from "lucide-react";
import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { Button } from "@/components/ui/button";
import NavItems from "@/components/navbar/nav-items";
import User from "@/components/navbar/user";

export default function Navbar() {
  return (
    <TooltipProvider>
      <aside className="fixed inset-y-0 left-0 w-80 flex flex-col dark:bg-zinc-950 text-white">
        <div className="flex items-center gap-2 p-4 border-b border-zinc-700">
          <Package2 className="h-6 w-6" />
          <span className="font-semibold text-lg">AI Chatbot</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <nav className="p-4">
              <h2 className="text-sm font-semibold text-zinc-400 mb-2">
                Chat History
              </h2>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-start mb-2"
                  >
                    <Link
                      href="/"
                      className="flex items-center gap-2 text-white"
                    >
                      <MessageSquarePlus className="h-5 w-5" />
                      New Chat
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <span>Start a new chat</span>
                </TooltipContent>
              </Tooltip>

              <NavItems />
              <NavItems />
            </nav>
          </ScrollArea>
        </div>
        <div className="p-2 border-t border-zinc-700">
          <User />
        </div>
      </aside>
    </TooltipProvider>
  );
}
