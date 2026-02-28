import { User } from './user.entity';
import { Checkin } from './checkin.entity';
import { Conflict } from './conflict.entity';
import { AiInsight } from './ai-insight.entity';
export declare class Relationship {
    id: string;
    partner_1: User;
    partner_2: User;
    status: string;
    start_date: Date;
    checkins: Checkin[];
    conflicts: Conflict[];
    insights: AiInsight[];
}
