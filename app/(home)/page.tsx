import { trpc, prefetch, HydrateClient } from "@/trpc/server";
import ClientPage from "./client";
import { Suspense } from "react";

export default async function Home() {
  prefetch(trpc.hello.queryOptions({ text: "Salman !!!!" }));

  return (
    <HydrateClient>
      <Suspense fallback={<p>Loading ...</p>}>
        <ClientPage />
      </Suspense>
    </HydrateClient>
  );
}
