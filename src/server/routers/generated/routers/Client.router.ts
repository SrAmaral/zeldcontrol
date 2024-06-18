/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        aggregate: procedure.input($Schema.ClientInputSchema.aggregate).query(({ ctx, input }) => checkRead(db(ctx).client.aggregate(input as any))),

        createMany: procedure.input($Schema.ClientInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).client.createMany(input as any))),

        create: procedure.input($Schema.ClientInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).client.create(input as any))),

        deleteMany: procedure.input($Schema.ClientInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).client.deleteMany(input as any))),

        delete: procedure.input($Schema.ClientInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).client.delete(input as any))),

        findFirst: procedure.input($Schema.ClientInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).client.findFirst(input as any))),

        findFirstOrThrow: procedure.input($Schema.ClientInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).client.findFirstOrThrow(input as any))),

        findMany: procedure.input($Schema.ClientInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).client.findMany(input as any))),

        findUnique: procedure.input($Schema.ClientInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).client.findUnique(input as any))),

        findUniqueOrThrow: procedure.input($Schema.ClientInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).client.findUniqueOrThrow(input as any))),

        groupBy: procedure.input($Schema.ClientInputSchema.groupBy).query(({ ctx, input }) => checkRead(db(ctx).client.groupBy(input as any))),

        updateMany: procedure.input($Schema.ClientInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).client.updateMany(input as any))),

        update: procedure.input($Schema.ClientInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).client.update(input as any))),

        upsert: procedure.input($Schema.ClientInputSchema.upsert).mutation(async ({ ctx, input }) => checkMutate(db(ctx).client.upsert(input as any))),

        count: procedure.input($Schema.ClientInputSchema.count).query(({ ctx, input }) => checkRead(db(ctx).client.count(input as any))),

    }
    );
}
