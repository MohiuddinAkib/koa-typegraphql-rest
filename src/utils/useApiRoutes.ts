import Koa from 'koa';
import mount from 'koa-mount';

// Custom imports
import apiRoutes from '@/routes/api';

export default (app: Koa) => {
  app.use(mount('/api/v1', apiRoutes()));
};
