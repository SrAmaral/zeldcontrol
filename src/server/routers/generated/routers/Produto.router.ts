/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        aggregate: procedure.input($Schema.ProdutoInputSchema.aggregate).query(({ ctx, input }) => checkRead(db(ctx).produto.aggregate(input as any))),

        createMany: procedure.input($Schema.ProdutoInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).produto.createMany(input as any))),

        create: procedure.input($Schema.ProdutoInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).produto.create(input as any))),

        deleteMany: procedure.input($Schema.ProdutoInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).produto.deleteMany(input as any))),

        delete: procedure.input($Schema.ProdutoInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).produto.delete(input as any))),

        findFirst: procedure.input($Schema.ProdutoInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).produto.findFirst(input as any))),

        findFirstOrThrow: procedure.input($Schema.ProdutoInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).produto.findFirstOrThrow(input as any))),

        findMany: procedure.input($Schema.ProdutoInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).produto.findMany(input as any))),

        findUnique: procedure.input($Schema.ProdutoInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).produto.findUnique(input as any))),

        findUniqueOrThrow: procedure.input($Schema.ProdutoInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).produto.findUniqueOrThrow(input as any))),

        groupBy: procedure.input($Schema.ProdutoInputSchema.groupBy).query(({ ctx, input }) => checkRead(db(ctx).produto.groupBy(input as any))),

        updateMany: procedure.input($Schema.ProdutoInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).produto.updateMany(input as any))),

        update: procedure.input($Schema.ProdutoInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).produto.update(input as any))),

        upsert: procedure.input($Schema.ProdutoInputSchema.upsert).mutation(async ({ ctx, input }) => checkMutate(db(ctx).produto.upsert(input as any))),

        count: procedure.input($Schema.ProdutoInputSchema.count).query(({ ctx, input }) => checkRead(db(ctx).produto.count(input as any))),

    }
    );
}
