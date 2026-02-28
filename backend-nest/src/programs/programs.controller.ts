import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('programs')
@UseGuards(JwtAuthGuard)
export class ProgramsController {
    constructor(private readonly programsService: ProgramsService) { }

    @Get()
    async getAllPrograms() {
        return this.programsService.getAllPrograms();
    }

    @Get(':relationshipId/active')
    async getActivePrograms(@Param('relationshipId') relationshipId: string) {
        return this.programsService.getActiveProgramsForRelationship(relationshipId);
    }

    @Post(':relationshipId/enroll/:programId')
    async enrollInProgram(
        @Param('relationshipId') relationshipId: string,
        @Param('programId') programId: string
    ) {
        return this.programsService.enrollInProgram(relationshipId, programId);
    }

    @Patch(':relationshipId/progress/:programId')
    async updateProgress(
        @Param('relationshipId') relationshipId: string,
        @Param('programId') programId: string,
        @Body() body: { completed_tasks: number, total_tasks: number }
    ) {
        return this.programsService.updateProgress(relationshipId, programId, body.completed_tasks, body.total_tasks);
    }
}
