import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('programs')
export class Program {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'int' })
    duration_days: number;

    @Column({ default: false })
    is_premium: boolean;

    @CreateDateColumn()
    created_at: Date;
}
