import { Resolver, Mutation, Arg } from 'type-graphql';

// Custom imports
import * as mutations from '@/constants/graphql/mutations';
import UserService from '@/services/graphql/user/UserService';
import EmailService from '@/services/graphql/email/EmailService';

@Resolver()
export default class ForgotPasswordResolver {
  constructor(
    private readonly _userService: UserService,
    private readonly _emailService: EmailService
  ) {}

  @Mutation(() => Boolean, {
    name: mutations.FORGOT_PASSWORD_PATH,
    description: mutations.FORGOT_PASSWORD_PATH_DESC
  })
  async [mutations.FORGOT_PASSWORD_PATH](
    @Arg('email') email: string
  ): Promise<boolean> {
    const user = await this._userService.findUserByEmail(email);
    this._emailService.sendForgotPasswordMail(user);
    return true;
  }
}
