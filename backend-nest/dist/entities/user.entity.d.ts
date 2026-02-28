import { Relationship } from './relationship.entity';
import { Checkin } from './checkin.entity';
export declare class User {
    id: string;
    email: string;
    password_hash: string;
    attachment_style: string;
    love_language: string;
    created_at: Date;
    relationshipsAsPartner1: Relationship[];
    relationshipsAsPartner2: Relationship[];
    checkins: Checkin[];
}
