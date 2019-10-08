import fs from 'fs';
import path from 'path';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

// Custom imports
import * as upload from '@/constants/upload';
import * as mutations from '@/constants/graphql/mutations';
import UserService from '@/services/graphql/user/UserService';
import UploadException from '@/exceptions/upload/UploadException';

@Resolver()
export default class ProfilePictureResolver {
  constructor(private readonly _userService: UserService) {}
  @Mutation(() => Boolean, {
    name: mutations.ADD_PROFILE_PICTURE_PATH,
    description: mutations.ADD_PROFILE_PICTURE_PATH_DESC
  })
  async [mutations.ADD_PROFILE_PICTURE_PATH](@Arg(
    'picture',
    () => GraphQLUpload
  )
  {
    filename,
    createReadStream
  }: FileUpload): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const destPath = upload.PROFILE_PICTURE_UPLOAD_PATH;

      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }

      createReadStream().pipe(
        fs
          .createWriteStream(path.join(destPath, filename))
          .on('finish', () => resolve(true))
          .on('error', (error: Error) =>
            reject(new UploadException(error.message))
          )
      );
    });
  }
}
