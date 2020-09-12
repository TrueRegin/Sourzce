import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UploadsModule } from './uploads/uploads.module';

@Module({
    imports: [UploadsModule, ServeStaticModule.forRoot({serveRoot: '/', rootPath: join(__dirname, '..', 'client')}), ConfigModule.forRoot()],
    controllers: [],
    providers: [],
})
export class AppModule {}
