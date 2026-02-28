import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, BeforeInsert } from 'typeorm';
import { Relationship } from './relationship.entity';
import { Checkin } from './checkin.entity';

function generateInviteCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No confusable chars
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password_hash: string;

    @Column({ nullable: true })
    display_name: string;

    @Column({ unique: true, nullable: true })
    invite_code: string;

    @Column({ nullable: true })
    attachment_style: string;

    @Column({ nullable: true })
    love_language: string;

    @CreateDateColumn()
    created_at: Date;

    @BeforeInsert()
    setInviteCode() {
        if (!this.invite_code) {
            this.invite_code = generateInviteCode();
        }
    }

    @OneToMany(() => Relationship, relationship => relationship.partner_1)
    relationshipsAsPartner1: Relationship[];

    @OneToMany(() => Relationship, relationship => relationship.partner_2)
    relationshipsAsPartner2: Relationship[];

    @OneToMany(() => Checkin, checkin => checkin.user)
    checkins: Checkin[];
}
