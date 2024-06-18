/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import createSystemUserRouter from "./SystemUser.router";
import createClienteRouter from "./Cliente.router";
import createOrdemServicoRouter from "./OrdemServico.router";
import createProdutoRouter from "./Produto.router";
import createOrcamentoRouter from "./Orcamento.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        systemUser: createSystemUserRouter(router, procedure),
        cliente: createClienteRouter(router, procedure),
        ordemServico: createOrdemServicoRouter(router, procedure),
        produto: createProdutoRouter(router, procedure),
        orcamento: createOrcamentoRouter(router, procedure),
    }
    );
}
