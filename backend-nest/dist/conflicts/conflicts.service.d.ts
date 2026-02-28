import { Repository } from 'typeorm';
import { Conflict } from '../entities/conflict.entity';
import { Relationship } from '../entities/relationship.entity';
export declare class ConflictsService {
    private conflictsRepository;
    private relationshipsRepository;
    private algorithm;
    private key;
    constructor(conflictsRepository: Repository<Conflict>, relationshipsRepository: Repository<Relationship>);
    private encrypt;
    private decrypt;
    logConflict(relationshipId: string, data: any): Promise<Conflict>;
    resolveConflict(conflictId: string): Promise<Conflict>;
    getRecentConflicts(relationshipId: string): Promise<Conflict[]>;
}
