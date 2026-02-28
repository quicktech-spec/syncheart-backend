import { Relationship } from './relationship.entity';
export declare class Conflict {
    id: string;
    relationship: Relationship;
    trigger_category: string;
    intensity: number;
    resolution_status: string;
    private_notes: string;
    created_at: Date;
}
