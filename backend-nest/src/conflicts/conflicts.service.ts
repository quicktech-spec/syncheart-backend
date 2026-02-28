import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conflict } from '../entities/conflict.entity';
import { Relationship } from '../entities/relationship.entity';
import * as crypto from 'crypto';

@Injectable()
export class ConflictsService {
    private algorithm = 'aes-256-cbc';
    // Must be 32 bytes
    private key = Buffer.from(process.env.APP_ENCRYPTION_KEY || '12345678901234567890123456789012', 'utf-8');

    constructor(
        @InjectRepository(Conflict)
        private conflictsRepository: Repository<Conflict>,
        @InjectRepository(Relationship)
        private relationshipsRepository: Repository<Relationship>
    ) { }

    private encrypt(text: string): string {
        if (!text) return text;
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return `${iv.toString('hex')}:${encrypted}`;
    }

    private decrypt(text: string): string {
        if (!text) return text;
        const textParts = text.split(':');
        const iv = Buffer.from(textParts.shift() as string, 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }

    async logConflict(relationshipId: string, data: any): Promise<Conflict> {
        const relationship = await this.relationshipsRepository.findOne({ where: { id: relationshipId } });
        if (!relationship) throw new NotFoundException('Relationship not found');

        const conflict = this.conflictsRepository.create({
            relationship: { id: relationshipId },
            trigger_category: data.trigger_category,
            intensity: data.intensity,
            resolution_status: 'unresolved',
            private_notes: this.encrypt(data.private_notes)
        });

        return this.conflictsRepository.save(conflict);
    }

    async resolveConflict(conflictId: string): Promise<Conflict> {
        const conflict = await this.conflictsRepository.findOne({ where: { id: conflictId } });
        if (!conflict) throw new NotFoundException('Conflict not found');

        conflict.resolution_status = 'resolved';
        return this.conflictsRepository.save(conflict);
    }

    async getRecentConflicts(relationshipId: string): Promise<Conflict[]> {
        const conflicts = await this.conflictsRepository.find({
            where: { relationship: { id: relationshipId } },
            order: { created_at: 'DESC' },
            take: 10,
        });

        return conflicts.map(conflict => {
            if (conflict.private_notes) {
                try {
                    conflict.private_notes = this.decrypt(conflict.private_notes);
                } catch (e) {
                    console.error('Failed to decrypt private notes', e);
                }
            }
            return conflict;
        });
    }
}
