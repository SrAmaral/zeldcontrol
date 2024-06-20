/* eslint-disable */
import type { PrismaClient } from "@prisma/client";
import type { AnyRootConfig, CreateRouterInner, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, unsetMarker } from "@trpc/server";
import createClientRouter from "./Client.router";
import createSystemUserRouter from "./SystemUser.router";

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
        client: createClientRouter(router, procedure),
    }
    );
}
