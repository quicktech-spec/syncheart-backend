import { Repository } from 'typeorm';
import { Checkin } from '../entities/checkin.entity';
import { Relationship } from '../entities/relationship.entity';
export declare class CheckinsService {
    private checkinsRepository;
    private relationshipsRepository;
    constructor(checkinsRepository: Repository<Checkin>, relationshipsRepository: Repository<Relationship>);
    createCheckin(userId: string, relationshipId: string, data: any): Promise<Checkin>;
    getRecentCheckins(relationshipId: string): Promise<Checkin[]>;
}
