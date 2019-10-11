import http from 'http';
import chalk from 'chalk';

// Custom imports
import * as constants from '@/constants/debug';
import * as messages from '@/constants/messages';

export default (server: http.Server, cleanUp: Function) => {
  // Graceful shutdown
  process.on('SIGINT', () => {
    constants.gracefulShutdownDebug(
      chalk.grey(messages.GRACEFULLY_SHUTTING_DOWN)
    );

    server.close(async () => {
      constants.gracefulShutdownDebug(
        chalk.grey(messages.GRACEFULLY_SHUTTED_DOWN)
      );

      await cleanUp();
      process.exit();
    });

    // Force close server after 5secs
    setTimeout(async e => {
      constants.gracefulShutdownDebug(
        chalk.grey(messages.FORCING_SERVER_CLOSE, e)
      );

      await cleanUp();
      process.exit(1);
    }, 5000);
  });
};
