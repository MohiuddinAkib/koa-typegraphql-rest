import { createConnection } from 'typeorm';

// Custom imports
import useDatabaseErrorHandler from './useDatabaseErrorHandler';
import useDatabaseListenHandler from './useDatabaseListenHandler';

export default (cb: Function) => {
  createConnection()
    .then(() => {
      useDatabaseListenHandler();
      cb();
    })
    .catch(useDatabaseErrorHandler);
};
