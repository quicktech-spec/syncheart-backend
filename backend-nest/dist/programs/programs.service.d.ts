import { Repository } from 'typeorm';
import { Program } from '../entities/program.entity';
import { ProgramProgress } from '../entities/program-progress.entity';
export declare class ProgramsService {
    private programsRepository;
    private programProgressRepository;
    constructor(programsRepository: Repository<Program>, programProgressRepository: Repository<ProgramProgress>);
    getAllPrograms(): Promise<Program[]>;
    getActiveProgramsForRelationship(relationshipId: string): Promise<ProgramProgress[]>;
    enrollInProgram(relationshipId: string, programId: string): Promise<ProgramProgress>;
    updateProgress(relationshipId: string, programId: string, completedTasks: number, totalTasks: number): Promise<ProgramProgress>;
}
