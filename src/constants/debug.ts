import debug from 'debug';

export const serverListenDebug = debug('app:listen');
export const dbListenDebug = debug('app:db');
export const gracefulShutdownDebug = debug('app:graceful-shutdown');
