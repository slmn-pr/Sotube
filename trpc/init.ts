import { db } from "@/db";
import { users } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { initTRPC, TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import superjson from "superjson";

import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { ratelimit } from "@/lib/ratelimit";

/**
 * This context creator accepts `headers` so it can be reused in both
 * the RSC server caller (where you pass `next/headers`) and the
 * API route handler (where you pass the request headers).
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  const { userId } = await auth();
  console.log("CLERK USER ID:", userId);

  return { clerkUserId: userId };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async (opts) => {
  console.log("clerkUserId:", opts.ctx.clerkUserId);

  if (!opts.ctx.clerkUserId) {
    console.log("No Clerk User");
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, opts.ctx.clerkUserId))
    .limit(1);

  console.log("DB User:", user);

  if (!user) {
    console.log("User not found in database");
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const { success, remaining } = await ratelimit.limit(user.id);
  console.log("Remaining rate limit", remaining);

  if (!success) {
    throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
  }

  return opts.next({
    ctx: {
      ...opts.ctx,
      user,
    },
  });
});
