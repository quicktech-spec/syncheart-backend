import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
    constructor(private readonly aiService: AiService) { }

    @Post('rewrite')
    async rewriteMessage(@Body() body: { text: string }) {
        const suggestion = await this.aiService.generateRewrite(body.text);
        return { original: body.text, suggested: suggestion };
    }

    @Get('predict/:relationshipId')
    async predictDrift(@Param('relationshipId') relationshipId: string) {
        return this.aiService.predictDrift(relationshipId);
    }
}
