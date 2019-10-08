import Koa from 'koa';
import { GraphQLError } from 'graphql';
import httpStatusCodes from 'http-status-codes';
import * as messages from '@/constants/messages';
import * as badRequestPaths from '@/constants/graphql/badRequestPaths';
import * as mutations from '@/constants/graphql/mutations';
import { ArgumentValidationError, UnauthorizedError } from 'type-graphql';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

export default (error: GraphQLError, ctx: Koa.Context) => {
  console.log(error);
  if (error.originalError instanceof ArgumentValidationError) {
    const { extensions, locations, message, path } = error;

    return {
      statusCode: httpStatusCodes.BAD_REQUEST,
      error: httpStatusCodes.getStatusText(httpStatusCodes.BAD_REQUEST),
      message,
      locations,
      path,
      extensions,
      validationErrors: error.originalError.validationErrors.reduce(
        (acc: any, { target, ...curr }) => {
          acc[curr.property] = curr;

          return acc;
        },
        {}
      )
    };
  }

  if (error.originalError instanceof UnauthorizedError) {
    const { extensions, locations, message, path } = error;
    return {
      statusCode: httpStatusCodes.UNAUTHORIZED,
      error: httpStatusCodes.getStatusText(httpStatusCodes.UNAUTHORIZED),
      message: message,
      locations,
      path,
      extensions
    };
  }

  if (error.originalError instanceof EntityNotFoundError) {
    const badRequest = badRequestPaths.AUTH_PATHS.some(path =>
      error.path!.includes(path)
    );
    const statusCode = badRequest
      ? httpStatusCodes.BAD_REQUEST
      : httpStatusCodes.NOT_FOUND;

    const message = httpStatusCodes.getStatusText(statusCode);

    return {
      statusCode,
      error: message,
      message
    };
  }

  if (error.originalError && 'status' in error.originalError!) {
    if (error.originalError instanceof Error) {
      const status = (error.originalError as any).status;

      return {
        statusCode: status,
        error: httpStatusCodes.getStatusText(status),
        message: error.originalError!.message,
        locations: error.locations,
        path: error.path
      };
    }
  }

  return {
    statusCode: httpStatusCodes.INTERNAL_SERVER_ERROR,
    error: httpStatusCodes.getStatusText(httpStatusCodes.INTERNAL_SERVER_ERROR),
    message: error.message,
    locations: error.locations,
    path: error.path
  };
};
