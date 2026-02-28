import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Checkin } from './checkin.entity';
import { Conflict } from './conflict.entity';
import { AiInsight } from './ai-insight.entity';

@Entity('relationships')
export class Relationship {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.relationshipsAsPartner1)
    @JoinColumn({ name: 'partner_1_id' })
    partner_1: User;

    @ManyToOne(() => User, user => user.relationshipsAsPartner2)
    @JoinColumn({ name: 'partner_2_id' })
    partner_2: User;

    @Column({ default: 'active' })
    status: string;

    @CreateDateColumn()
    start_date: Date;

    @OneToMany(() => Checkin, checkin => checkin.relationship)
    checkins: Checkin[];

    @OneToMany(() => Conflict, conflict => conflict.relationship)
    conflicts: Conflict[];

    @OneToMany(() => AiInsight, insight => insight.relationship)
    insights: AiInsight[];
}
