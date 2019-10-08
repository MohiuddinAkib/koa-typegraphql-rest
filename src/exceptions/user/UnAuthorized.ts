import httpStatusCodes from 'http-status-codes';

// Custom imports
import { IThrowable } from '@/interfaces/IThrowable';

export default class UnAuthorized extends Error implements IThrowable {
  public readonly status: number;
  constructor(
    message: string = httpStatusCodes.getStatusText(
      httpStatusCodes.UNAUTHORIZED
    ),
    status: number = httpStatusCodes.UNAUTHORIZED
  ) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
  }
}
