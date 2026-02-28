import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CheckinsService } from './checkins.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('checkins')
@UseGuards(JwtAuthGuard)
export class CheckinsController {
    constructor(private readonly checkinsService: CheckinsService) { }

    @Post(':relationshipId')
    async createCheckin(
        @Request() req,
        @Param('relationshipId') relationshipId: string,
        @Body() checkinData: any
    ) {
        // req.user contains the extracted JWT payload user object
        return this.checkinsService.createCheckin(req.user.id, relationshipId, checkinData);
    }

    @Get(':relationshipId/recent')
    async getRecentCheckins(@Param('relationshipId') relationshipId: string) {
        return this.checkinsService.getRecentCheckins(relationshipId);
    }
}
