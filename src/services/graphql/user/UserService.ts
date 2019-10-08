import bcrypt from 'bcryptjs';
import { Service } from 'typedi';

// Custom imports
import { User } from '@/entity/User';
import { redis } from '@/utils/useRedis';
import { IUserService } from './IUserService';
import * as messages from '@/constants/messages';
import { IUserLoginDto } from '@/dto/user/userLoginDto';
import UserNotFound from '@/exceptions/user/UserNotFound';
import TokenNotFound from '@/exceptions/user/TokenNotValid';
import * as redisPrefixes from '@/constants/redisPrefixes';
import { IUserRegisterDto } from '@/dto/user/userRegisterDto';
import UserNotConfirmed from '@/exceptions/user/UserNotConfirmed';
import PasswordUnmatched from '@/exceptions/user/PasswordUnmatched';
// import UserAlreadyExists from '@/exceptions/user/UserAlreadyExists';
import ChangePasswordInput from '@/routes/graphql/resolvers/user/changePassword/ChangePasswordInput';

@Service()
export default class UserService implements IUserService {
  async changePassword(data: ChangePasswordInput): Promise<User> {
    const userId = await redis.get(
      redisPrefixes.FORGOT_PASSWORD_PREFIX + data.token
    );

    if (!userId) {
      throw new TokenNotFound(messages.INVALID_CHANGE_PASSWORD_TOKEN);
    }

    const user = await User.findOneOrFail(userId);

    redis.del(redisPrefixes.FORGOT_PASSWORD_PREFIX + data.token);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.newPassword, salt);

    user.password = hashedPassword;

    user.save();

    return user;
  }

  async findUserById(id: string | number): Promise<User> {
    return User.findOneOrFail(id);
  }

  async findUserByEmail(email: string): Promise<User> {
    return User.findOneOrFail({ where: { email } });
  }

  async findUserExistance(email: string): Promise<boolean> {
    const [, userCount] = await User.findAndCount({
      email: email
    });

    // if (userCount > 0) {
    //   throw new UserAlreadyExists();
    // }

    return userCount > 0 ? false : true;
  }

  async createUser(userData: IUserRegisterDto): Promise<User> {
    const user = await User.create(userData).save();
    return user;
  }

  async signInUser(userData: IUserLoginDto): Promise<User> {
    const user = await User.findOneOrFail({
      where: { email: userData.email }
    });

    if (!user) {
      throw new UserNotFound(messages.LOGIN_FAILED, 400);
    }

    const passwordMatch = await user.comparePassword(userData.password);

    if (!passwordMatch) {
      throw new PasswordUnmatched(messages.LOGIN_FAILED);
    }

    if (!user.confirmed) {
      throw new UserNotConfirmed();
    }

    return user;
  }

  async confirmUser(token: string): Promise<boolean> {
    const userId = await redis.get(
      redisPrefixes.CONFIRMATION_USER_PREFIX + token
    );

    if (!userId) {
      throw new TokenNotFound(messages.INVALID_CONFIRMATION_TOKEN);
    }

    await User.update({ id: +userId }, { confirmed: true });

    await redis.del(token);

    return true;
  }
}
