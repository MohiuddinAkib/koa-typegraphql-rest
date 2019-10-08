import Koa from 'koa';
import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';

// Custom imports
import { User } from '@/entity/User';
import * as mutations from '@/constants/graphql/mutations';
import UserService from '@/services/graphql/user/UserService';
import ChangePasswordInput from './changePassword/ChangePasswordInput';

@Resolver()
export default class ChangePassword {
  constructor(private readonly _userService: UserService) {}

  @Mutation(() => User, {
    nullable: true,
    name: mutations.CHANGE_PASSWORD_PATH,
    description: mutations.CHANGE_PASSWORD_PATH_DESC
  })
  async [mutations.CHANGE_PASSWORD_PATH](
    @Arg('data') data: ChangePasswordInput
  ): Promise<User> {
    const user = await this._userService.changePassword(data);
    return user;
  }
}
