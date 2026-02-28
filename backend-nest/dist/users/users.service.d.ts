import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Relationship } from '../entities/relationship.entity';
import { Checkin } from '../entities/checkin.entity';
import { Conflict } from '../entities/conflict.entity';
import { AiInsight } from '../entities/ai-insight.entity';
import { ProgramProgress } from '../entities/program-progress.entity';
export declare class UsersService {
    private usersRepo;
    private relationshipsRepo;
    private checkinsRepo;
    private conflictsRepo;
    private aiInsightsRepo;
    private programProgressRepo;
    constructor(usersRepo: Repository<User>, relationshipsRepo: Repository<Relationship>, checkinsRepo: Repository<Checkin>, conflictsRepo: Repository<Conflict>, aiInsightsRepo: Repository<AiInsight>, programProgressRepo: Repository<ProgramProgress>);
    deleteUserAccount(userId: string): Promise<{
        message: string;
    }>;
}
