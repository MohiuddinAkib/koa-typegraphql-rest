import winston from 'winston';
// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
const level = process.env.LOG_LEVEL || 'debug';

// Formatting Function Declaration
// @function: formatParams
// @params: info {}
// @return: formatted String
function formatParams(info: any): string {
  const { timestamp, level, message, ...args } = info;
  const ts = timestamp.slice(0, 19).replace('T', ' ');

  return `${ts} ${level}: ${message} ${
    Object.keys(args).length ? JSON.stringify(args, null, '') : ''
  }`;
}

// Create An Instance of Format Option
const format: any = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(formatParams)
);

// Transports for logging
const transports: any[] = [];
// Exceptions transports
const exceptionTransports: any[] = [];
// Transport and exception addition based on environment
if (process.env.NODE_ENV !== 'production') {
  transports.push(new winston.transports.Console());
  exceptionTransports.push(new winston.transports.Console());
} else {
  transports.push(
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  );

  exceptionTransports.push(
    new winston.transports.File({ filename: 'exceptions.log' })
  );
}

export default () => {
  const logger = winston.createLogger({
    level,
    format,
    transports
  });

  logger.exceptions.handle(...exceptionTransports);
};
