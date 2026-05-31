import { trpc, prefetch, HydrateClient } from "@/trpc/server";
import ClientPage from "./client";
import { Suspense } from "react";

export default async function Home() {
  await prefetch(
    trpc.hello.queryOptions({
      text: "world",
    }),
  );

  return (
    <HydrateClient>
      <Suspense fallback={<p>Loading ...</p>}>
        <ClientPage />
      </Suspense>
    </HydrateClient>
  );
}
