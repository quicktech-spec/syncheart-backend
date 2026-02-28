import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Relationship } from './relationship.entity';
import { Checkin } from './checkin.entity';

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
    generateInviteCode() {
        this.invite_code = uuidv4().replace(/-/g, '').substring(0, 8).toUpperCase();
    }

    @OneToMany(() => Relationship, relationship => relationship.partner_1)
    relationshipsAsPartner1: Relationship[];

    @OneToMany(() => Relationship, relationship => relationship.partner_2)
    relationshipsAsPartner2: Relationship[];

    @OneToMany(() => Checkin, checkin => checkin.user)
    checkins: Checkin[];
}
