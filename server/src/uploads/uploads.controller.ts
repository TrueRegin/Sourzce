import {
    BadRequestException,
    Controller,
    Post,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadsController {
    @Post()
    @UseInterceptors(FilesInterceptor('uploadFiles'))
    uploadFile(@UploadedFiles() files) {
        if (files && typeof files === typeof [] && files.length > 0) {
            const returnFileInfo = files.map(file => {
                return file.originalName;
            });
            return returnFileInfo.join('\n');
        } else {
            throw new BadRequestException('No files were uploaded!');
        }
    }
}
