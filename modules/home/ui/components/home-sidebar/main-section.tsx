"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FlameIcon, HomeIcon, PlaySquareIcon } from "lucide-react";
import Link from "next/link";

const items = [
  {
    title: "Home",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "Subscriptions",
    url: "/feed/subscriptions",
    icon: PlaySquareIcon,
    auth: true,
  },
  {
    title: "Trending",
    url: "/feed/tending",
    icon: FlameIcon,
  },
];

export default function MainSection() {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <TooltipProvider>
                <SidebarMenuButton
                  tooltip={item.title}
                  asChild
                  isActive={false} // TODO: Change to look at current pathname
                  onClick={() => {}} // TODO: Do something on click
                >
                  <Link href={item.url} className="flex items-center gap-4 ">
                    <item.icon />
                    <span className="text-sm">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </TooltipProvider>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
