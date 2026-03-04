import { Controller, Get } from '@nestjs/common';
import * as process from 'process';

@Controller('debug')
export class DebugController {
    @Get('db')
    getDb() {
        return {
            hasUrl: !!process.env.DATABASE_URL,
            urlStarts: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 15) : null
        };
    }
}
