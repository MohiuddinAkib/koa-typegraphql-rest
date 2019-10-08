import httpStatusCodes from 'http-status-codes';

// Custom imports
import { IThrowable } from '@/interfaces/IThrowable';

export default class UploadException extends Error implements IThrowable {
  public readonly status: number;

  constructor(
    message: string = httpStatusCodes.getStatusText(
      httpStatusCodes.INTERNAL_SERVER_ERROR
    ),
    status: number = httpStatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message);

    this.status = status;
    this.name = this.constructor.name;
  }
}
