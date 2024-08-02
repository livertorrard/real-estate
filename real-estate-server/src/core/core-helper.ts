import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';

export const storage = {
  storage: diskStorage({
    destination: './public/images',
    filename: (req, file, cb) => {
      const filename: string = path
        .parse(file.originalname)
        .name.replace(/\s/g, '');
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}_${uuid()}${extension}`);
    },
  }),
};

export const removeImageFromServer = (pictureNames: string[]) => {
  for (const pictureName of pictureNames) {
    const filePath = path.join(process.cwd(), 'public/images', pictureName);
    if (fs.existsSync(filePath)) {
      fs.rmSync(filePath);
    }
  }
};
