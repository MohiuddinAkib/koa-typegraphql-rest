import httpStatusCodes from 'http-status-codes';

// Custom imports
import NotFound from '../common/NotFound';
import * as messages from '@/constants/messages';
import { IThrowable } from '@/interfaces/IThrowable';

export default class TokenNotValid extends NotFound implements IThrowable {
  constructor(
    message: string = messages.TOKEN_NOT_VALID,
    status: number = httpStatusCodes.BAD_REQUEST
  ) {
    super(message, status);
  }
}
