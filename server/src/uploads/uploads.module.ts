import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { defaultDiskOptions } from '../utils/multer.storage';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';



@Module({
    imports: [
        MulterModule.register({
            dest: "./public",
            storage: diskStorage(defaultDiskOptions),
        }),
    ],
    controllers: [UploadsController],
    providers: [UploadsService],
})
export class UploadsModule {}
