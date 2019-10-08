import http from 'http';

import useServerErrorHandler from './useServerErrorHandler';
import useServerListeningHandler from './useServerListeningHandler';

export default (server: http.Server) => {
  server
    .on('listening', useServerListeningHandler)
    .once('error', useServerErrorHandler);
};
