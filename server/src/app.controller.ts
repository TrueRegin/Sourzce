import { Controller, Get } from '@nestjs/common';
import { EXISTS_ROUTE } from './config';

@Controller()
export class AppController {
    @Get(EXISTS_ROUTE)
    SERVER_IP() {
        let ip = process.env.SERVER_IP + ':' + process.env.PORT;
        const protocolRegex = /^https?:\/\//;
        if(!protocolRegex.test(ip)) ip = "http://" + ip;
        return ip;
    }
}
