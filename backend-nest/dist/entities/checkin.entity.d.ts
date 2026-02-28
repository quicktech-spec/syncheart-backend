import { User } from './user.entity';
import { Relationship } from './relationship.entity';
export declare class Checkin {
    id: string;
    user: User;
    relationship: Relationship;
    mood_score: number;
    stress_score: number;
    energy_score: number;
    need_type: string;
    created_at: Date;
}
