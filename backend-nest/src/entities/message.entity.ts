import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Relationship } from './relationship.entity';

@Entity('messages')
@Index(['relationship', 'created_at'])
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Relationship, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'relationship_id' })
    relationship: Relationship;

    // Sender user ID – stored plaintext for routing only
    @Column({ name: 'sender_id' })
    sender_id: string;

    // AES-GCM encrypted payload (Base64). Server NEVER sees plaintext.
    @Column({ type: 'text' })
    ciphertext: string;

    // IV used for AES-GCM – required for decryption, not secret
    @Column({ name: 'iv', length: 32 })
    iv: string;

    // Auth tag from AES-GCM (ensures integrity)
    @Column({ name: 'auth_tag', length: 64 })
    auth_tag: string;

    @CreateDateColumn()
    created_at: Date;
}
