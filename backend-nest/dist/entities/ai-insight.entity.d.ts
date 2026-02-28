import { Relationship } from './relationship.entity';
export declare class AiInsight {
    id: string;
    relationship: Relationship;
    type: string;
    payload: Record<string, any>;
    created_at: Date;
}
