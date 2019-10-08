import Koa from 'koa';
import morgan from 'koa-morgan';

export default (app: Koa): any => {
  // Log format string
  const format: string =
    process.env.NODE_ENV === 'production' ? 'combined' : 'dev';

  // Log 400 and 500 Errors to Console as STDERR
  app.use(
    morgan(format, {
      skip: (ctx: any) => {
        return ctx.status < 400;
      },
      stream: process.stderr
    })
  );

  // Log 200 and 300 Request to Console as STDOUT
  app.use(
    morgan(format, {
      skip: (ctx: any) => {
        return ctx.status >= 400;
      },
      stream: process.stdout
    })
  );
};
