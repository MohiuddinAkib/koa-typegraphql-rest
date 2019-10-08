import { InputType, Field } from 'type-graphql';
import { Length, IsEmail } from 'class-validator';
import { IsEmailAlreadyExist } from './IsEmailAlreadyExist';
import * as messages from '@/constants/messages';

@InputType()
export default class RegisterInput {
  @Field({ name: 'firstName' })
  @Length(1, 255, {
    message: messages.FIRST_NAME_LENGTH_VALIDATION_ERROR
  })
  firstName!: string;

  @Field({ name: 'lastName' })
  @Length(1, 255, {
    message: messages.LAST_NAME_LENGTH_VALIDATION_ERROR
  })
  lastName!: string;

  @Field({ name: 'email' })
  @IsEmail({}, { message: messages.EMAIL_VALIDATION_ERROR })
  @IsEmailAlreadyExist({ message: messages.EMAIL_ALREADY_EXISTS })
  email!: string;

  @Field({ name: 'password' })
  @Length(1, 8, {
    message: messages.PASSWORD_LENGTH_VALIDATION_ERROR
  })
  password!: string;
}
