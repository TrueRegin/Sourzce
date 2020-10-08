import {
    BadRequestException,
    Controller,
    Post,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PDFDocument, PDFImage } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { diskStorage } from 'multer';
import { join } from 'path';
import { deleteFolderContents } from 'src/utils/delete.folder';
import { tempDiskOptions } from 'src/utils/multer.storage';
import { readFileSync, writeFileSync } from 'fs';
import { UploadsService } from './uploads.service';

@Controller('upload')
export class UploadsController {
    constructor(private readonly uploadsService: UploadsService) {}

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

    @Post('pdf')
    @UseInterceptors(
        FilesInterceptor('uploadFiles', 500, {
            dest: './public',
            storage: diskStorage(tempDiskOptions),
        }),
    )
    async uploadPDF(@UploadedFiles() files) {
        const result = this.uploadsService.convertImagesToPDF(files)
        if(result) {

        }
        else {
            throw new BadRequestException("Invalid image types uploaded, only JPEG, JPG, and PNG images are allowed")
        }
    }
}
