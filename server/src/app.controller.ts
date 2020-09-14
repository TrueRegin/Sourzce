import { Controller, Get } from '@nestjs/common';
import { EXISTS_ROUTE } from './config';

@Controller()
export class AppController {
    @Get(EXISTS_ROUTE)
    SERVER_EXISTS() {
        return {exists: true}
    }
}
