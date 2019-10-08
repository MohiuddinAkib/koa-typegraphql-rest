import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import { Container } from 'typedi';

// Custom import
import UserService from '@/services/graphql/user/UserService';
import { IUserService } from '@/services/graphql/user/IUserService';

const userService: IUserService = Container.get(UserService);

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint
  implements ValidatorConstraintInterface {
  validate(email: string, args: ValidationArguments) {
    return userService.findUserExistance(email).then(bool => {
      return bool;
    });
  }
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyExistConstraint
    });
  };
}
