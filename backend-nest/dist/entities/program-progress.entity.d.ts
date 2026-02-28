import { Program } from './program.entity';
import { Relationship } from './relationship.entity';
export declare class ProgramProgress {
    program_id: string;
    relationship_id: string;
    program: Program;
    relationship: Relationship;
    progress_percentage: number;
    completed_tasks: number;
}
