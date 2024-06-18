/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        aggregate: procedure.input($Schema.ClienteInputSchema.aggregate).query(({ ctx, input }) => checkRead(db(ctx).cliente.aggregate(input as any))),

        createMany: procedure.input($Schema.ClienteInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).cliente.createMany(input as any))),

        create: procedure.input($Schema.ClienteInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).cliente.create(input as any))),

        deleteMany: procedure.input($Schema.ClienteInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).cliente.deleteMany(input as any))),

        delete: procedure.input($Schema.ClienteInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).cliente.delete(input as any))),

        findFirst: procedure.input($Schema.ClienteInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).cliente.findFirst(input as any))),

        findFirstOrThrow: procedure.input($Schema.ClienteInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).cliente.findFirstOrThrow(input as any))),

        findMany: procedure.input($Schema.ClienteInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).cliente.findMany(input as any))),

        findUnique: procedure.input($Schema.ClienteInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).cliente.findUnique(input as any))),

        findUniqueOrThrow: procedure.input($Schema.ClienteInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).cliente.findUniqueOrThrow(input as any))),

        groupBy: procedure.input($Schema.ClienteInputSchema.groupBy).query(({ ctx, input }) => checkRead(db(ctx).cliente.groupBy(input as any))),

        updateMany: procedure.input($Schema.ClienteInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).cliente.updateMany(input as any))),

        update: procedure.input($Schema.ClienteInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).cliente.update(input as any))),

        upsert: procedure.input($Schema.ClienteInputSchema.upsert).mutation(async ({ ctx, input }) => checkMutate(db(ctx).cliente.upsert(input as any))),

        count: procedure.input($Schema.ClienteInputSchema.count).query(({ ctx, input }) => checkRead(db(ctx).cliente.count(input as any))),

    }
    );
}
