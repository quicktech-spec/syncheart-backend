import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program } from '../entities/program.entity';
import { ProgramProgress } from '../entities/program-progress.entity';

@Injectable()
export class ProgramsService {
    constructor(
        @InjectRepository(Program)
        private programsRepository: Repository<Program>,
        @InjectRepository(ProgramProgress)
        private programProgressRepository: Repository<ProgramProgress>
    ) { }

    async getAllPrograms(): Promise<Program[]> {
        return this.programsRepository.find();
    }

    async getActiveProgramsForRelationship(relationshipId: string): Promise<ProgramProgress[]> {
        return this.programProgressRepository.find({
            where: { relationship_id: relationshipId },
            relations: ['program']
        });
    }

    async enrollInProgram(relationshipId: string, programId: string): Promise<ProgramProgress> {
        const progress = this.programProgressRepository.create({
            program_id: programId,
            relationship_id: relationshipId,
            progress_percentage: 0,
            completed_tasks: 0
        });

        return this.programProgressRepository.save(progress);
    }

    async updateProgress(relationshipId: string, programId: string, completedTasks: number, totalTasks: number): Promise<ProgramProgress> {
        const progress = await this.programProgressRepository.findOne({
            where: { program_id: programId, relationship_id: relationshipId }
        });

        if (!progress) throw new NotFoundException('Program enrollment not found');

        progress.completed_tasks = completedTasks;
        progress.progress_percentage = (completedTasks / totalTasks) * 100;

        return this.programProgressRepository.save(progress);
    }
}
