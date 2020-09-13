import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get('SERVER_IP')
    SERVER_IP() {
        let ip = process.env.SERVER_IP + ':' + process.env.PORT;
        const protocolRegex = /^https?:\/\//;
        if(!protocolRegex.test(ip)) ip = "http://" + ip;
        return ip;
    }
}
