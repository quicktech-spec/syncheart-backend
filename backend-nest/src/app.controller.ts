import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    constructor() { }

    @Get('health')
    getHealth(): object {
        return {
            status: 'Engine active',
            version: '2.0.0-enterprise',
            framework: 'NestJS'
        };
    }
}
