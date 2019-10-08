import httpStatusCodes from 'http-status-codes';

// Custom imports
import NotFound from '../common/NotFound';
import * as messages from '@/constants/messages';
import { IThrowable } from '@/interfaces/IThrowable';

export default class UserNotFound extends NotFound implements IThrowable {
  constructor(
    message: string = messages.USER_NOT_FOUND,
    status: number = httpStatusCodes.NOT_FOUND
  ) {
    super(message, status);
  }
}
