import httpStatusCodes from 'http-status-codes';

// Custom imports
import * as messages from '@/constants/messages';
import { IThrowable } from '@/interfaces/IThrowable';

export default class PasswordUnmatched extends Error implements IThrowable {
  public readonly status: number;

  constructor(
    message: string = messages.PASSWORD_UNMATCHED,
    status: number = httpStatusCodes.BAD_REQUEST
  ) {
    super(message);

    this.status = status;
    this.name = this.constructor.name;
  }
}
