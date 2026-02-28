import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Relationship } from '../entities/relationship.entity';
import { Checkin } from '../entities/checkin.entity';
import { Conflict } from '../entities/conflict.entity';
import { AiInsight } from '../entities/ai-insight.entity';
import { ProgramProgress } from '../entities/program-progress.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepo: Repository<User>,
        @InjectRepository(Relationship) private relationshipsRepo: Repository<Relationship>,
        @InjectRepository(Checkin) private checkinsRepo: Repository<Checkin>,
        @InjectRepository(Conflict) private conflictsRepo: Repository<Conflict>,
        @InjectRepository(AiInsight) private aiInsightsRepo: Repository<AiInsight>,
        @InjectRepository(ProgramProgress) private programProgressRepo: Repository<ProgramProgress>,
    ) { }

    async deleteUserAccount(userId: string) {
        // Find user
        const user = await this.usersRepo.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Find relationship where user is involved
        const relationships = await this.relationshipsRepo.find({
            where: [
                { partner_1: { id: userId } },
                { partner_2: { id: userId } }
            ]
        });

        // For each relationship, we wipe all relationship data and the relationship
        for (const rel of relationships) {
            // Unlink from checkins
            await this.checkinsRepo.delete({ relationship: { id: rel.id } });
            // Unlink from program progress
            await this.programProgressRepo.delete({ relationship_id: rel.id });
            // Unlink from conflicts
            await this.conflictsRepo.delete({ relationship: { id: rel.id } });
            // Unlink from AI Insights
            await this.aiInsightsRepo.delete({ relationship: { id: rel.id } });

            // Delete relationship
            await this.relationshipsRepo.delete(rel.id);
        }

        // Finally delete the user
        await this.usersRepo.delete(userId);

        return { message: 'User account and all associated relationship data permanently deleted in accordance with GDPR.' };
    }
}
