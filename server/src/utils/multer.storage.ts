import { BadRequestException } from '@nestjs/common';
import { imageRegex, splitFilename} from './file.ext';

export const tempDiskOptions = {
    destination(req, file, callback) {
        callback(null, './public/temp');
    },
    filename(req, file, callback) {
        const [filename, ext] = splitFilename(file.originalname)
        if (ext) {
            callback(null, new Date().getTime() + "-" + filename + ext);
        } else
            callback(
                new BadRequestException('Files with no extension uploaded'),
            );
    },
};

export const defaultDiskOptions = {
    destination(req, file, callback) {
        if (imageRegex.test(file.originalname))
            callback(null, './public/images');
        else callback(null, './public/uploads');
    },
    filename(req, file, callback) {
        const [filename, ext] = splitFilename(file.originalname)
        if(ext) {
            callback(null, new Date().getTime() + "-" + filename + ext);
        } else {
            callback(new BadRequestException("File(s) with no extension uploaded!"))
        }
    },
};
