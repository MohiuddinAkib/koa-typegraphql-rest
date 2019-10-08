// Custom imports
import * as queries from '@/constants/graphql/queries';
import * as mutations from '@/constants/graphql/mutations';

export const AUTH_PATHS = [
  mutations.LOGIN_PATH,
  mutations.FORGOT_PASSWORD_PATH,
  queries.ME_PATH
];
