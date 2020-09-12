import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { v4 } from 'uuid';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { diskStorage } from 'multer'

const imageRegex = /(png|jpe?g|gif)$/i

@Module({
    imports: [
        MulterModule.register({
            dest: './public/uploads',
            storage: diskStorage({
                destination(req, file, callback) {
                    if(imageRegex.test(file.originalname))
                        callback(null, './public/images')
                    else
                        callback(null, './public/uploads')
                },
                filename(req, file, callback) {
                    callback(null, v4() + file.originalname);                        
                }
            }),
        }),
    ],
    controllers: [UploadsController],
    providers: [UploadsService],
})
export class UploadsModule {}
