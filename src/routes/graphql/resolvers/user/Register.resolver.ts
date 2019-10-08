import {
  Query,
  Resolver,
  Mutation,
  Arg,
  // Authorized,
  UseMiddleware
} from 'type-graphql';

// Custom imports
import { User } from '@/entity/User';
import { isAuth } from '@/middleware/graphql/isAuth';
import UserEvents from '@/events/UserEvents';
import * as userEvents from '@/constants/events/user';
import * as mutations from '@/constants/graphql/mutations';
import UserService from '@/services/graphql/user/UserService';
import RegisterInput from '@/routes/graphql/resolvers/user/register/RegisterInput';

@Resolver(User)
export default class RegisterResolver {
  constructor(private readonly _userService: UserService) {}

  // @Authorized()
  // @Query(() => String, { nullable: true, description: 'Hahahahah huhuhu' })
  // async hello() {
  //   return 'null';
  // }

  @UseMiddleware(isAuth.bind(this))
  @Query(() => String, {
    nullable: true,
    name: mutations.HELLO_PATH,
    description: mutations.HELLO_PATH_DESC
  })
  async [mutations.HELLO_PATH]() {
    return 'This is a protected route';
  }

  @Mutation(() => User, {
    nullable: true,
    name: mutations.REGISTER_PATH,
    description: mutations.REGISTER_PATH_DESC
  })
  async [mutations.REGISTER_PATH](@Arg('data')
  {
    firstName,
    lastName,
    email,
    password
  }: RegisterInput): Promise<User> {
    const user = await this._userService.createUser({
      firstName,
      lastName,
      email,
      password
    });

    UserEvents.emit(userEvents.USER_CREATED, user);

    return user;
  }
}
