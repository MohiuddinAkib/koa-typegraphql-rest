import Koa from 'koa';
import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';

// Custom imports
import { User } from '@/entity/User';
import UserService from '@/services/graphql/user/UserService';
import * as mutations from '@/constants/graphql/mutations';

@Resolver()
export default class LoginResolver {
  constructor(private readonly _userService: UserService) {}

  @Mutation(() => User, {
    nullable: true,
    name: mutations.LOGIN_PATH,
    description: mutations.LOGIN_PATH_DESC
  })
  async [mutations.LOGIN_PATH](
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: Koa.Context
  ): Promise<User | null> {
    const user = await this._userService.signInUser({ email, password });

    if (!user) {
      return null;
    }

    ctx.session!.userId = user.id;
    return user;
  }
}
