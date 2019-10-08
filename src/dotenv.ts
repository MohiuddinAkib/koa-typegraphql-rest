import path from 'path';

if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');

  dotenv.config({
    path: path.resolve(process.cwd(), '.env.development')
  });
}
