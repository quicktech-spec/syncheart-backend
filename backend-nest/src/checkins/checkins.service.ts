import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Checkin } from '../entities/checkin.entity';
import { Relationship } from '../entities/relationship.entity';

@Injectable()
export class CheckinsService {
    constructor(
        @InjectRepository(Checkin)
        private checkinsRepository: Repository<Checkin>,
        @InjectRepository(Relationship)
        private relationshipsRepository: Repository<Relationship>
    ) { }

    async createCheckin(userId: string, relationshipId: string, data: any): Promise<Checkin> {
        const relationship = await this.relationshipsRepository.findOne({ where: { id: relationshipId } });
        if (!relationship) throw new NotFoundException('Relationship not found');

        const checkin = this.checkinsRepository.create({
            user: { id: userId },
            relationship: { id: relationshipId },
            mood_score: data.mood_score,
            stress_score: data.stress_score,
            energy_score: data.energy_score,
            need_type: data.need_type,
        });

        return this.checkinsRepository.save(checkin);
    }

    async getRecentCheckins(relationshipId: string): Promise<Checkin[]> {
        return this.checkinsRepository.find({
            where: { relationship: { id: relationshipId } },
            order: { created_at: 'DESC' },
            take: 14, // 14 days memory window aggregation as per architecture
            relations: ['user']
        });
    }
}
