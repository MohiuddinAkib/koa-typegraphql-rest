import Koa from 'koa';
import path from 'path';
import config from 'config';
import json from 'koa-json';
import cors from 'koa-cors';
import Redis from 'ioredis';
import serve from 'koa-static';
import helmet from 'koa-helmet';
import convert from 'koa-convert';
import compose from 'koa-compose';
import respond from 'koa-respond';
import redisStore from 'koa-redis';
import compress from 'koa-compress';
import bodyParser from 'koa-bodyparser';
import session from 'koa-generic-session';
import koa404Handler from 'koa-404-handler';
import errorHandler from 'koa-better-error-handler';

// Custom imports
import useMorgan from '@/utils/useMorgan';
import useGraphQL from '@/utils/useGraphQL';
import * as cookies from '@/constants/cookies';
import useApiRoutes from '@/utils/useApiRoutes';

const defaultMiddlewares: Koa.Middleware[] = [
  koa404Handler,
  convert(
    cors({
      credentials: true,
      origin: config.get('app.cors.origin')
    })
  ),
  bodyParser(),
  session({
    store: redisStore({
      client: new Redis()
    }),
    key: cookies.KEY,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true
    }
  }),
  respond(),
  serve(path.resolve(__dirname, config.get('app.publicPath')))
];

const developmentMiddlewares: Koa.Middleware[] = [json()];

const productionMiddlewares: Koa.Middleware[] = [helmet(), compress()];

const customMiddlewares: Koa.Middleware[] = [];

const middlewares =
  process.env.NODE_ENV !== 'production'
    ? defaultMiddlewares.concat(developmentMiddlewares, customMiddlewares)
    : productionMiddlewares.concat(defaultMiddlewares, customMiddlewares);

export default async (app: Koa) => {
  // override koa's undocumented error handler
  app.context.onerror = errorHandler;
  // specify that this is our api
  app.context.api = true;
  // App secret keys
  app.keys = Array.from(config.get('app.secret_keys'));
  // Compose middlewares
  app.use(compose(middlewares));
  // Morgan logger middleware
  useMorgan(app);
  // Api routes middleware
  useApiRoutes(app);
  // GraphQL middleware
  await useGraphQL(app);
};
