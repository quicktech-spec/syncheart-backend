import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

/**
 * Stores ONLY encrypted message data.
 * Server NEVER has access to plaintext — AES-256-GCM encrypted client-side.
 * relationship_id is stored as a plain string to avoid circular entity imports.
 */
@Entity('messages')
@Index(['relationship_id', 'created_at'])
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'relationship_id' })
    relationship_id: string;

    /** Sender user UUID – stored only for routing, not content identification */
    @Column({ name: 'sender_id' })
    sender_id: string;

    /** AES-GCM encrypted message payload (Base64). Server cannot decrypt this. */
    @Column({ type: 'text' })
    ciphertext: string;

    /** Initialization vector for AES-GCM (not secret, required for decryption) */
    @Column({ name: 'iv', length: 64 })
    iv: string;

    /** Auth tag confirming message integrity */
    @Column({ name: 'auth_tag', length: 64 })
    auth_tag: string;

    @CreateDateColumn()
    created_at: Date;
}
