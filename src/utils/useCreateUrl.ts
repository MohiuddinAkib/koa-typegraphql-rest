import uuid from 'uuid';

// Custom imports
import { redis } from './useRedis';
import * as messages from '@/constants/messages';
import * as redisPrefixes from '@/constants/redisPrefixes';
import * as urlTypes from '@/constants/useCreateUrl/urlTypes';
import InvalidUrlType from '@/exceptions/useCreateUrl/InvalidUrlType';

type TokenType = typeof urlTypes.CONFIRM | typeof urlTypes.FORGOT_PASSWORD;

type TokenPrefixType =
  | typeof redisPrefixes.CONFIRMATION_USER_PREFIX
  | typeof redisPrefixes.FORGOT_PASSWORD_PREFIX;

type IRedisTokenPrefixes = {
  [key in TokenType]: TokenPrefixType;
};

const redisTokenPrefixes: IRedisTokenPrefixes = {
  [urlTypes.CONFIRM]: redisPrefixes.CONFIRMATION_USER_PREFIX,
  [urlTypes.FORGOT_PASSWORD]: redisPrefixes.FORGOT_PASSWORD_PREFIX
};

export const createConfirmationUrl = async (
  userId: number | string
): Promise<string> => {
  return createUrl(userId, urlTypes.CONFIRM);
};

export const createForgotPasswordUrl = async (
  userId: number | string
): Promise<string> => {
  return createUrl(userId, urlTypes.FORGOT_PASSWORD);
};

const createUrl = async (userId: number | string, type: TokenType) => {
  console.log();
  if (!Object.values(urlTypes).includes(type)) {
    throw new InvalidUrlType(messages.INVALID_URL_TYPE);
  }
  const token = uuid.v4();
  const prefix = redisTokenPrefixes[type];
  await redis.set(prefix + token, userId, 'EX', 60 * 60 * 24);
  return `http://localhost:3000/user/${type}/${token}`;
};
