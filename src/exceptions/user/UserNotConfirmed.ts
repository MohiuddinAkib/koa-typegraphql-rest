import httpStatusCodes from 'http-status-codes';

// Custom imports
import { IThrowable } from '@/interfaces/IThrowable';
import * as messages from '@/constants/messages';

export default class UserNotConfirmed extends Error implements IThrowable {
  public readonly status: number;
  constructor(
    message: string = messages.USER_NOT_CONFIRMED,
    status: number = httpStatusCodes.BAD_REQUEST
  ) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
