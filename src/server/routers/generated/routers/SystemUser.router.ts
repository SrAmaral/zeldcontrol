/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        aggregate: procedure.input($Schema.SystemUserInputSchema.aggregate).query(({ ctx, input }) => checkRead(db(ctx).systemUser.aggregate(input as any))),

        createMany: procedure.input($Schema.SystemUserInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).systemUser.createMany(input as any))),

        create: procedure.input($Schema.SystemUserInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).systemUser.create(input as any))),

        deleteMany: procedure.input($Schema.SystemUserInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).systemUser.deleteMany(input as any))),

        delete: procedure.input($Schema.SystemUserInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).systemUser.delete(input as any))),

        findFirst: procedure.input($Schema.SystemUserInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).systemUser.findFirst(input as any))),

        findFirstOrThrow: procedure.input($Schema.SystemUserInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).systemUser.findFirstOrThrow(input as any))),

        findMany: procedure.input($Schema.SystemUserInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).systemUser.findMany(input as any))),

        findUnique: procedure.input($Schema.SystemUserInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).systemUser.findUnique(input as any))),

        findUniqueOrThrow: procedure.input($Schema.SystemUserInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).systemUser.findUniqueOrThrow(input as any))),

        groupBy: procedure.input($Schema.SystemUserInputSchema.groupBy).query(({ ctx, input }) => checkRead(db(ctx).systemUser.groupBy(input as any))),

        updateMany: procedure.input($Schema.SystemUserInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).systemUser.updateMany(input as any))),

        update: procedure.input($Schema.SystemUserInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).systemUser.update(input as any))),

        upsert: procedure.input($Schema.SystemUserInputSchema.upsert).mutation(async ({ ctx, input }) => checkMutate(db(ctx).systemUser.upsert(input as any))),

        count: procedure.input($Schema.SystemUserInputSchema.count).query(({ ctx, input }) => checkRead(db(ctx).systemUser.count(input as any))),

    }
    );
}
