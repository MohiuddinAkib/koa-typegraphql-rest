import chalk from 'chalk';
import logger from 'winston';

// Custom import
import * as constants from '@/constants/debug';

export default (error: Error) => {
  // Logging error
  logger.error(error);
  // Console error
  const errorMsg = chalk.bold(
    chalk.red(
      `------------------ DB connection error block ( ${chalk.cyan(
        error.name
      )} ) ------------------`
    )
  );

  constants.dbListenDebug(errorMsg);
  constants.dbListenDebug(chalk.blueBright(error.message));
  constants.dbListenDebug(error.stack);
  constants.dbListenDebug(errorMsg);

  process.exit(1);
};
