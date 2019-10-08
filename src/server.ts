import './dotenv';
import Koa from 'koa';
import './moduleAlias';
import http from 'http';
import 'reflect-metadata';
import config from 'config';
import logger from 'winston';

// Custom imports
import useLogger from '@/utils/useLogger';
import useDatabase from '@/utils/useDatabase';
import useMiddlewares from '@/utils/useMiddlewares';
import useServerHandler from '@/utils/useServerHandler';
import useEventListeners from '@/utils/useEventListeners';
import usePromiseRejectionHandler from '@/utils/usePromiseRejectionHandler';

// Winston logger middleware
useLogger();
// Handle promise rejection error
usePromiseRejectionHandler();
// Subscribe to all custom events
useEventListeners();

const main = async () => {
  // Init app
  const app = new Koa();
  // Assign middlewares
  await useMiddlewares(app);

  // Handle Koa error
  app.on('error', (error: any, ctx: Koa.Context) => {
    logger.error(error);

    // Sentry log or winston
    ctx.send(error.status, {
      ststusCode: error.status,
      message: error.message
    });
  });
  // Listen for http request
  const server: http.Server = app.listen(config.get('app.port'));
  // Handle server listen status
  useServerHandler(server);
};

useDatabase(main);
