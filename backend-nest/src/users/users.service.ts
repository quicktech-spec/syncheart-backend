import {
    Injectable, NotFoundException, BadRequestException, ConflictException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Relationship } from '../entities/relationship.entity';
import { Checkin } from '../entities/checkin.entity';
import { Conflict } from '../entities/conflict.entity';
import { AiInsight } from '../entities/ai-insight.entity';
import { ProgramProgress } from '../entities/program-progress.entity';
import { Message } from '../entities/message.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepo: Repository<User>,
        @InjectRepository(Relationship) private relationshipsRepo: Repository<Relationship>,
        @InjectRepository(Checkin) private checkinsRepo: Repository<Checkin>,
        @InjectRepository(Conflict) private conflictsRepo: Repository<Conflict>,
        @InjectRepository(AiInsight) private aiInsightsRepo: Repository<AiInsight>,
        @InjectRepository(ProgramProgress) private programProgressRepo: Repository<ProgramProgress>,
        @InjectRepository(Message) private messagesRepo: Repository<Message>,
    ) { }

    /** Get current user's profile including invite code */
    async getProfile(userId: string) {
        const user = await this.usersRepo.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');

        throw new BadRequestException(`TRACE: User found with email ${user.email}, auth_id ${userId}, ID: ${user.id}`);

        // Backfill invite_code for users registered before this feature was added
        if (!user.invite_code) {
            try {
                const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
                let code = '';
                for (let i = 0; i < 8; i++) code += chars[Math.floor(Math.random() * chars.length)];

                // Use raw query to avoid ORM field validation issues
                await this.usersRepo.query(
                    `UPDATE users SET invite_code = $1 WHERE id = $2 AND (invite_code IS NULL OR invite_code = '')`,
                    [code, userId]
                );
                user.invite_code = code;
            } catch (e) {
                // Silently continue — invite_code backfill is non-critical
                console.error('invite_code backfill error:', e.message);
            }
        }


        return {
            id: user.id,
            email: user.email,
            display_name: user.display_name ?? null,
            invite_code: user.invite_code ?? null,
            created_at: user.created_at,
        };
    }


    /** Link two users as a couple using invite code */
    async syncCouple(requesterId: string, inviteCode: string) {
        if (!inviteCode) throw new BadRequestException('Invite code required');

        const partner = await this.usersRepo.findOne({ where: { invite_code: inviteCode } });
        if (!partner) throw new NotFoundException('No user found with that invite code');
        if (partner.id === requesterId) throw new BadRequestException('Cannot sync with yourself');

        // Check if relationship already exists
        const existing = await this.relationshipsRepo.findOne({
            where: [
                { partner_1: { id: requesterId }, partner_2: { id: partner.id } },
                { partner_1: { id: partner.id }, partner_2: { id: requesterId } },
            ], relations: ['partner_1', 'partner_2'],
        });
        if (existing) throw new ConflictException('Relationship already exists');

        const requester = await this.usersRepo.findOne({ where: { id: requesterId } });
        const rel = this.relationshipsRepo.create({
            partner_1: requester,
            partner_2: partner,
            status: 'active',
        });
        await this.relationshipsRepo.save(rel);

        return {
            relationship_id: rel.id,
            partner: { id: partner.id, email: partner.email, display_name: partner.display_name },
        };
    }

    /** Get the current user's active relationship */
    async getRelationship(userId: string) {
        const rel = await this.relationshipsRepo.findOne({
            where: [
                { partner_1: { id: userId }, status: 'active' },
                { partner_2: { id: userId }, status: 'active' },
            ],
            relations: ['partner_1', 'partner_2'],
        });
        if (!rel) return null;
        const partner = rel.partner_1.id === userId ? rel.partner_2 : rel.partner_1;
        return {
            relationship_id: rel.id,
            start_date: rel.start_date,
            partner: { id: partner.id, email: partner.email, display_name: partner.display_name },
        };
    }

    /** Send E2E encrypted message — server stores ciphertext only */
    async sendMessage(senderId: string, relationshipId: string, ciphertext: string, iv: string, auth_tag: string) {
        const rel = await this.relationshipsRepo.findOne({
            where: { id: relationshipId },
            relations: ['partner_1', 'partner_2'],
        });
        if (!rel) throw new NotFoundException('Relationship not found');

        // Security: ensure sender belongs to this relationship
        if (rel.partner_1.id !== senderId && rel.partner_2.id !== senderId) {
            throw new BadRequestException('Access denied to this relationship');
        }

        const msg = this.messagesRepo.create({ relationship_id: relationshipId, sender_id: senderId, ciphertext, iv, auth_tag });
        await this.messagesRepo.save(msg);
        return { id: msg.id, created_at: msg.created_at };
    }

    /** Get encrypted messages for a relationship */
    async getMessages(userId: string, relationshipId: string) {
        const rel = await this.relationshipsRepo.findOne({
            where: { id: relationshipId },
            relations: ['partner_1', 'partner_2'],
        });
        if (!rel) throw new NotFoundException('Relationship not found');
        if (rel.partner_1.id !== userId && rel.partner_2.id !== userId) {
            throw new BadRequestException('Access denied');
        }

        return this.messagesRepo.find({
            where: { relationship_id: relationshipId },
            order: { created_at: 'ASC' },
            take: 100,
        });
    }

    async deleteUserAccount(userId: string) {
        const user = await this.usersRepo.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');

        const relationships = await this.relationshipsRepo.find({
            where: [{ partner_1: { id: userId } }, { partner_2: { id: userId } }]
        });

        for (const rel of relationships) {
            await this.messagesRepo.delete({ relationship_id: rel.id });
            await this.checkinsRepo.delete({ relationship: { id: rel.id } });
            await this.programProgressRepo.delete({ relationship_id: rel.id });
            await this.conflictsRepo.delete({ relationship: { id: rel.id } });
            await this.aiInsightsRepo.delete({ relationship: { id: rel.id } });
            await this.relationshipsRepo.delete(rel.id);
        }

        await this.usersRepo.delete(userId);
        return { message: 'User account and all data permanently deleted (GDPR compliant).' };
    }
}
