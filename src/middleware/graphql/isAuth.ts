import Koa from 'koa';
import { MiddlewareFn, UnauthorizedError } from 'type-graphql';

export const isAuth: MiddlewareFn<Koa.Context> = async ({ context }, next) => {
  if (!context.session!.userId) {
    throw new UnauthorizedError();
  }

  return next();
};
