import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { items } from "~/server/db/schema";

export const itemRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(items).values({
        name: input.name,
        createdById: ctx.session.user.id,
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const item = await ctx.db.query.items.findFirst({
      orderBy: (item, { desc }) => [desc(item.createdAt)],
    });

    return item ?? null;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  getItemsByUser: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const items = await ctx.db.query.items.findMany(
      {
        where: (item, { eq }) => eq(item.createdById, userId),
        orderBy: (item, { desc }) => [desc(item.lastCompletedAt)]
      }
    )
    return items;
  }),
});
