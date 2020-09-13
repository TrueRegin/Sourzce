import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import express = require('express');
import { join } from 'path';
import chalk = require('chalk');
import os = require('os');
import { DFT_PORT } from './config';

function getLanData() {
    const nets = os.networkInterfaces();
    const netResults = Object.create(null);

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal) {
                if (!netResults[name]) {
                    netResults[name] = [];
                }

                netResults[name].push(net.address);
            }
        }
    }

    return netResults;
}
const NetResults: { Ethernet: string[] } = getLanData();
let LAN_IP: undefined | string = undefined;
if (
    NetResults.Ethernet &&
    typeof NetResults.Ethernet === typeof [] &&
    NetResults.Ethernet.length > 0
) {
    LAN_IP = NetResults.Ethernet[0];
}
let production = false;
process.argv.forEach(arg => {
    if (arg === '--production') production = true;
});

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use('/public', express.static(join(__dirname, 'public')));
    if (production) {
        await app.listen(
            process.env.PORT || DFT_PORT,
            process.env.SERVER_IP || LAN_IP,
            () => {
                console.log(
                    chalk.whiteBright(`Sourzce server started on `),
                    chalk.bgHex("#ff2b75").hex("#fff").bold.underline.italic(
                        `http://${process.env.SERVER_IP || LAN_IP}:${process.env
                            .PORT || DFT_PORT}`,
                    ),
                );
            },
        );
    } else
        await app.listen(process.env.PORT, () => {
            console.log(
                chalk.whiteBright(`Sourzce server started on `),
                chalk.bgHex("#ff2b75").hex("#fff").bold.underline.italic(
                    `http://localhost:${process.env.PORT || DFT_PORT}`,
                ),
            );
        });

    if (LAN_IP && process.env.SERVER_IP) {
        console.log(
            chalk.bgYellow.whiteBright(
                "Note, in V 1.1.0+ of Sourzce you don't need to define SERVER_IP in .env, the server automatically gets it for you! Remove SERVER_IP to remove this message.",
            ),
        );
    }
}
bootstrap();
