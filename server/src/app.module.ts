import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { UploadsModule } from './uploads/uploads.module';

@Module({
    imports: [UploadsModule, ServeStaticModule.forRoot({serveRoot: '/', rootPath: join(__dirname, '..', 'client')})],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
