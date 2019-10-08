import Koa from 'koa';
import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';

// Custom imports
import * as mutations from '@/constants/graphql/mutations';
import UserService from '@/services/graphql/user/UserService';

@Resolver()
export default class ConfirmUserResolver {
  constructor(private readonly _userService: UserService) {}

  @Mutation(() => Boolean, {
    name: mutations.CONFIRM_USER_PATH,
    description: mutations.CONFIRM_USER_PATH_DESC
  })
  async [mutations.CONFIRM_USER_PATH](
    @Arg('token') token: string,
    @Ctx() ctx: Koa.Context
  ): Promise<boolean> {
    return this._userService.confirmUser(token);
  }
}
