/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        aggregate: procedure.input($Schema.OrdemServicoInputSchema.aggregate).query(({ ctx, input }) => checkRead(db(ctx).ordemServico.aggregate(input as any))),

        createMany: procedure.input($Schema.OrdemServicoInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).ordemServico.createMany(input as any))),

        create: procedure.input($Schema.OrdemServicoInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).ordemServico.create(input as any))),

        deleteMany: procedure.input($Schema.OrdemServicoInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).ordemServico.deleteMany(input as any))),

        delete: procedure.input($Schema.OrdemServicoInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).ordemServico.delete(input as any))),

        findFirst: procedure.input($Schema.OrdemServicoInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).ordemServico.findFirst(input as any))),

        findFirstOrThrow: procedure.input($Schema.OrdemServicoInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).ordemServico.findFirstOrThrow(input as any))),

        findMany: procedure.input($Schema.OrdemServicoInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).ordemServico.findMany(input as any))),

        findUnique: procedure.input($Schema.OrdemServicoInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).ordemServico.findUnique(input as any))),

        findUniqueOrThrow: procedure.input($Schema.OrdemServicoInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).ordemServico.findUniqueOrThrow(input as any))),

        groupBy: procedure.input($Schema.OrdemServicoInputSchema.groupBy).query(({ ctx, input }) => checkRead(db(ctx).ordemServico.groupBy(input as any))),

        updateMany: procedure.input($Schema.OrdemServicoInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).ordemServico.updateMany(input as any))),

        update: procedure.input($Schema.OrdemServicoInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).ordemServico.update(input as any))),

        upsert: procedure.input($Schema.OrdemServicoInputSchema.upsert).mutation(async ({ ctx, input }) => checkMutate(db(ctx).ordemServico.upsert(input as any))),

        count: procedure.input($Schema.OrdemServicoInputSchema.count).query(({ ctx, input }) => checkRead(db(ctx).ordemServico.count(input as any))),

    }
    );
}
