import { ClientInputSchema } from ".zenstack/zod/input";
import { createTRPCRouter, publicProcedure } from "../../trpc";


export const clientRouter = createTRPCRouter({
  getAll: publicProcedure.input(ClientInputSchema.findMany).query(({input, ctx}) => {
    return ctx.dbe.client.findMany(input)
  }),
  get: publicProcedure.input(ClientInputSchema.findUnique).query(({input, ctx}) => {
    return ctx.dbe.client.findUnique(input)
  }),
  create: publicProcedure.input(ClientInputSchema.create).mutation(({input, ctx}) => {
    return ctx.dbe.client.create(input)
  }),
  update: publicProcedure.input(ClientInputSchema.update).mutation(({input, ctx}) => {
    return ctx.dbe.client.update(input)
  }),
  delete: publicProcedure.input(ClientInputSchema.delete).mutation(({input, ctx}) => {
    return ctx.dbe.client.delete(input)
  }),
});