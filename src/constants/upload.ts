import path from 'path';
import config from 'config';

export const PROFILE_PICTURE_UPLOAD_PATH = path.resolve(
  process.cwd(),
  config.get('app.srcPath'),
  config.get('app.publicPath'),
  'images'
);
