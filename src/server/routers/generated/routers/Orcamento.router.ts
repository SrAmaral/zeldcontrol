/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        aggregate: procedure.input($Schema.OrcamentoInputSchema.aggregate).query(({ ctx, input }) => checkRead(db(ctx).orcamento.aggregate(input as any))),

        createMany: procedure.input($Schema.OrcamentoInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).orcamento.createMany(input as any))),

        create: procedure.input($Schema.OrcamentoInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).orcamento.create(input as any))),

        deleteMany: procedure.input($Schema.OrcamentoInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).orcamento.deleteMany(input as any))),

        delete: procedure.input($Schema.OrcamentoInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).orcamento.delete(input as any))),

        findFirst: procedure.input($Schema.OrcamentoInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).orcamento.findFirst(input as any))),

        findFirstOrThrow: procedure.input($Schema.OrcamentoInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).orcamento.findFirstOrThrow(input as any))),

        findMany: procedure.input($Schema.OrcamentoInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).orcamento.findMany(input as any))),

        findUnique: procedure.input($Schema.OrcamentoInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).orcamento.findUnique(input as any))),

        findUniqueOrThrow: procedure.input($Schema.OrcamentoInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).orcamento.findUniqueOrThrow(input as any))),

        groupBy: procedure.input($Schema.OrcamentoInputSchema.groupBy).query(({ ctx, input }) => checkRead(db(ctx).orcamento.groupBy(input as any))),

        updateMany: procedure.input($Schema.OrcamentoInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).orcamento.updateMany(input as any))),

        update: procedure.input($Schema.OrcamentoInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).orcamento.update(input as any))),

        upsert: procedure.input($Schema.OrcamentoInputSchema.upsert).mutation(async ({ ctx, input }) => checkMutate(db(ctx).orcamento.upsert(input as any))),

        count: procedure.input($Schema.OrcamentoInputSchema.count).query(({ ctx, input }) => checkRead(db(ctx).orcamento.count(input as any))),

    }
    );
}
