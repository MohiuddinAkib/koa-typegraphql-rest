import httpStatusCodes from 'http-status-codes';

// Custom imports
import * as messages from '@/constants/messages';
import { IThrowable } from '@/interfaces/IThrowable';

export default class UserAlreadyExists extends Error implements IThrowable {
  public readonly status: number;

  constructor(
    message: string = messages.USER_ALREADY_EXISTS,
    status: number = httpStatusCodes.BAD_REQUEST
  ) {
    super(message);

    this.status = status;
    this.name = this.constructor.name;
  }
}
