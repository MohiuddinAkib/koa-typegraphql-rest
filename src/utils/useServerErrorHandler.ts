import chalk from 'chalk';

// Custom imports
import * as constants from '@/constants/debug';

export default (error: Error) => {
  const errorMsg = chalk.bold(
    chalk.red(
      `--------------------- Server listening error block ( ${chalk.cyan(
        error.name
      )} ) ---------------------`
    )
  );

  constants.serverListenDebug(errorMsg);
  constants.serverListenDebug(chalk.blueBright(error.message));
  constants.serverListenDebug(error.stack);
  constants.serverListenDebug(errorMsg);
};
