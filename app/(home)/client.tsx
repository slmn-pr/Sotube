"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function ClientPage() {
  const trpc = useTRPC();
  const greeting = useSuspenseQuery(trpc.hello.queryOptions({ text: "world" }));

  return <div>Client says: {greeting.data.greeting}</div>;
}
