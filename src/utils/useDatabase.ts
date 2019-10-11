import { createConnection } from 'typeorm';

// Custom imports
import useDatabaseErrorHandler from './useDatabaseErrorHandler';
import useDatabaseListenHandler from './useDatabaseListenHandler';

export default (cb: Function) => {
  createConnection()
    .then(connection => {
      useDatabaseListenHandler();
      cb(connection);
    })
    .catch(useDatabaseErrorHandler);
};
