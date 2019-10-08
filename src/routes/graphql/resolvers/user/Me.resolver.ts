import Koa from 'koa';
import { Resolver, Query, Ctx } from 'type-graphql';

// Custom imports
import { User } from '@/entity/User';
import UserService from '@/services/graphql/user/UserService';
import * as queries from '@/constants/graphql/queries';

@Resolver()
export default class MeResolver {
  constructor(private readonly _userService: UserService) {}

  @Query(() => User, {
    nullable: true,
    name: queries.ME_PATH,
    description: queries.ME_PATH_DESC
  })
  async [queries.ME_PATH](@Ctx() ctx: Koa.Context) {
    const userId = ctx.session!.userId;
    if (!userId) {
      return null;
    }

    return this._userService.findUserById(userId);
  }
}
