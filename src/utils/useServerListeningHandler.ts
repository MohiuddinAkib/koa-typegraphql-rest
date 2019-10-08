import chalk from 'chalk';
import config from 'config';

// Custom imports
import * as constants from '@/constants/debug';
import * as messages from '@/constants/messages';

export default () =>
  constants.serverListenDebug(
    chalk.greenBright(`${messages.SERVER_LISTENING} ${config.get('app.port')}`)
  );
