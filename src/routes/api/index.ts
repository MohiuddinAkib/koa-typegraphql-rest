import fs from 'fs';
import path from 'path';
import combineRouters from 'koa-combine-routers';

const routerImports = fs
  .readdirSync(__dirname)
  .filter((file: string) => file !== path.basename(__filename))
  .map((file: string) => require(path.join(__dirname, file)).default);

const router = combineRouters(...routerImports);

export default router;
