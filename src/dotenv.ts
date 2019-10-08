import path from 'path';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({
    path: path.resolve(process.cwd(), `.env.development`)
  });
} else {
  dotenv.config({
    path: path.resolve(process.cwd(), `.env.production`)
  });
}
