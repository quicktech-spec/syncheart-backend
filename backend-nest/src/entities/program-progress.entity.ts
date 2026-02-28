import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Program } from './program.entity';
import { Relationship } from './relationship.entity';

@Entity('program_progress')
export class ProgramProgress {
    @PrimaryColumn('uuid')
    program_id: string;

    @PrimaryColumn('uuid')
    relationship_id: string;

    @ManyToOne(() => Program)
    @JoinColumn({ name: 'program_id' })
    program: Program;

    @ManyToOne(() => Relationship)
    @JoinColumn({ name: 'relationship_id' })
    relationship: Relationship;

    @Column({ type: 'float', default: 0 })
    progress_percentage: number;

    @Column({ type: 'int', default: 0 })
    completed_tasks: number;
}
