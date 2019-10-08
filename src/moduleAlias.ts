import path from 'path';
import config from 'config';
import moduleAlias from 'module-alias';

moduleAlias.addAlias(
  '@',
  path.resolve(process.cwd(), config.get('app.srcPath'))
);
