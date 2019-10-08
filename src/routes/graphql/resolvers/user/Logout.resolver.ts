import Koa from 'koa';
import { Resolver, Mutation, Ctx } from 'type-graphql';

// Custom imports
import * as cookies from '@/constants/cookies';
import * as mutations from '@/constants/graphql/mutations';

type MyContext = Koa.Context & { cookies: { clear: (key: string) => void } };

@Resolver()
export default class Logout {
  @Mutation(() => Boolean, {
    name: mutations.LOGOUT_PATH,
    description: mutations.LOGOUT_PATH_DESC
  })
  async [mutations.LOGOUT_PATH](@Ctx() ctx: MyContext): Promise<Boolean> {
    ctx.session = null;
    ctx.cookies.set(cookies.KEY, null as any);
    return true;
  }
}
