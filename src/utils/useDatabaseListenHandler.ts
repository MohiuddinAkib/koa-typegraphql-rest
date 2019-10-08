import chalk from 'chalk';

// Custom imports
import * as constants from '@/constants/debug';
import * as messages from '@/constants/messages';

export default () =>
  constants.dbListenDebug(chalk.yellowBright(messages.DB_LISTENING));
