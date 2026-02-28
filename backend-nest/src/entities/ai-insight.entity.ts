import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Relationship } from './relationship.entity';

@Entity('ai_insights')
export class AiInsight {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Relationship, rel => rel.insights)
    @JoinColumn({ name: 'relationship_id' })
    relationship: Relationship;

    @Column()
    type: string;

    @Column('simple-json')
    payload: Record<string, any>;

    @CreateDateColumn()
    created_at: Date;
}
