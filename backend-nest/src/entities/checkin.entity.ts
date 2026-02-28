import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Relationship } from './relationship.entity';

@Entity('checkins')
export class Checkin {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.checkins)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Relationship, rel => rel.checkins)
    @JoinColumn({ name: 'relationship_id' })
    relationship: Relationship;

    @Column({ type: 'int' })
    mood_score: number;

    @Column({ type: 'int' })
    stress_score: number;

    @Column({ type: 'int' })
    energy_score: number;

    @Column({ nullable: true })
    need_type: string;

    @CreateDateColumn()
    created_at: Date;
}
