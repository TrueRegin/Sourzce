import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import express = require('express');
import { join } from 'path';

let production = false;
process.argv.forEach(arg => {
    if (arg === '--production') production = true;
});

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use('/public', express.static(join(__dirname, 'public')));
    if (production) await app.listen(process.env.PORT, process.env.SERVER_IP);
    else await app.listen(process.env.PORT);
}
bootstrap();
