import { Length } from 'class-validator';
import { InputType, Field } from 'type-graphql';

// Custom imports
import * as messages from '@/constants/messages';

@InputType()
export default class ChangePasswordInput {
  @Field()
  token!: string;

  @Field({ name: 'newPassword' })
  @Length(1, 8, {
    message: messages.PASSWORD_LENGTH_VALIDATION_ERROR
  })
  newPassword!: string;
}
