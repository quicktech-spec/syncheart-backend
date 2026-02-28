import { ProgramsService } from './programs.service';
export declare class ProgramsController {
    private readonly programsService;
    constructor(programsService: ProgramsService);
    getAllPrograms(): Promise<import("../entities/program.entity").Program[]>;
    getActivePrograms(relationshipId: string): Promise<import("../entities/program-progress.entity").ProgramProgress[]>;
    enrollInProgram(relationshipId: string, programId: string): Promise<import("../entities/program-progress.entity").ProgramProgress>;
    updateProgress(relationshipId: string, programId: string, body: {
        completed_tasks: number;
        total_tasks: number;
    }): Promise<import("../entities/program-progress.entity").ProgramProgress>;
}
