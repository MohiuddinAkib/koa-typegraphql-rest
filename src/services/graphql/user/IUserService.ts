// Custom imports
import { User } from '@/entity/User';
import { IUserLoginDto } from '@/dto/user/userLoginDto';
import { IUserRegisterDto } from '@/dto/user/userRegisterDto';
import ChangePasswordInput from '@/routes/graphql/resolvers/user/changePassword/ChangePasswordInput';

export interface IUserService {
  findUserById(id: string | number): Promise<User>;
  findUserExistance(email: string): Promise<boolean>;
  createUser(userData: IUserRegisterDto): Promise<User>;
  signInUser(useData: IUserLoginDto): Promise<User>;
  confirmUser(token: string): Promise<boolean>;
  changePassword(data: ChangePasswordInput): Promise<User>;
}
