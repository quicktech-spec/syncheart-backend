import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Relationship } from './relationship.entity';

@Entity('conflicts')
export class Conflict {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Relationship, rel => rel.conflicts)
    @JoinColumn({ name: 'relationship_id' })
    relationship: Relationship;

    @Column()
    trigger_category: string;

    @Column({ type: 'int' })
    intensity: number;

    @Column({ default: 'unresolved' })
    resolution_status: string;

    @Column({ type: 'text', nullable: true })
    private_notes: string;

    @CreateDateColumn()
    created_at: Date;
}
