import httpStatusCodes from 'http-status-codes';

// Custom imports
import { IThrowable } from '@/interfaces/IThrowable';

export default class InvalidUrlType extends Error implements IThrowable {
  public readonly status: number;

  constructor(
    message: string = httpStatusCodes.getStatusText(
      httpStatusCodes.NOT_ACCEPTABLE
    ),
    status: number = httpStatusCodes.NOT_ACCEPTABLE
  ) {
    super(message);

    this.status = status;
    this.name = this.constructor.name;
  }
}
