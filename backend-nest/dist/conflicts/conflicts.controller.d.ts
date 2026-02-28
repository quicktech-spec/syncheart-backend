import { ConflictsService } from './conflicts.service';
export declare class ConflictsController {
    private readonly conflictsService;
    constructor(conflictsService: ConflictsService);
    logConflict(relationshipId: string, conflictData: any): Promise<import("../entities/conflict.entity").Conflict>;
    resolveConflict(conflictId: string): Promise<import("../entities/conflict.entity").Conflict>;
    getRecentConflicts(relationshipId: string): Promise<import("../entities/conflict.entity").Conflict[]>;
}
