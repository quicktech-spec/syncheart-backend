import { Controller, Post, Get, Body, Param, UseGuards, Patch } from '@nestjs/common';
import { ConflictsService } from './conflicts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('conflicts')
@UseGuards(JwtAuthGuard)
export class ConflictsController {
    constructor(private readonly conflictsService: ConflictsService) { }

    @Post(':relationshipId')
    async logConflict(
        @Param('relationshipId') relationshipId: string,
        @Body() conflictData: any
    ) {
        return this.conflictsService.logConflict(relationshipId, conflictData);
    }

    @Patch(':conflictId/resolve')
    async resolveConflict(@Param('conflictId') conflictId: string) {
        return this.conflictsService.resolveConflict(conflictId);
    }

    @Get(':relationshipId/recent')
    async getRecentConflicts(@Param('relationshipId') relationshipId: string) {
        return this.conflictsService.getRecentConflicts(relationshipId);
    }
}
