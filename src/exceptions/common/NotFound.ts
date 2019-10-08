import httpStatusCodes from 'http-status-codes';

// Custom imports
import { IThrowable } from '@/interfaces/IThrowable';

export default class NotFound extends Error implements IThrowable {
  public readonly status: number;

  constructor(
    message: string = httpStatusCodes.getStatusText(httpStatusCodes.NOT_FOUND),
    status: number = httpStatusCodes.NOT_FOUND
  ) {
    super(message);

    this.status = status;
    this.name = this.constructor.name;
  }
}
