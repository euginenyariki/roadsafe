import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Index } from 'typeorm';

export enum DisputeReason {
  WRONG_PRICE = 'WRONG_PRICE',
  PROVIDER_NO_SHOW = 'PROVIDER_NO_SHOW',
  POOR_SERVICE = 'POOR_SERVICE',
  DAMAGE = 'DAMAGE',
  PAYMENT_PROBLEM = 'PAYMENT_PROBLEM',
  SAFETY_ISSUE = 'SAFETY_ISSUE',
  OTHER = 'OTHER',
}

export enum DisputeStatus {
  OPEN = 'OPEN',
  INVESTIGATING = 'INVESTIGATING',
  EVIDENCE_REQUESTED = 'EVIDENCE_REQUESTED',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
  APPEALED = 'APPEALED',
}

export enum DisputeDecision {
  APPROVED = 'APPROVED',
  PARTIAL = 'PARTIAL',
  REJECTED = 'REJECTED',
  PENDING = 'PENDING',
}

@Entity('disputes')
@Index(['bookingId'])
@Index(['status'])
export class Dispute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  bookingId: string;

  @Column({ type: 'uuid' })
  openedBy: string;

  @Column({ type: 'enum', enum: DisputeReason })
  reason: DisputeReason;

  @Column({ type: 'enum', enum: DisputeStatus, default: DisputeStatus.OPEN })
  status: DisputeStatus;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'json', default: [] })
  attachmentUrls: string[];

  @Column({ type: 'uuid', nullable: true })
  investigatedBy: string;

  @Column({ type: 'text', nullable: true })
  investigationNotes: string;

  @Column({ type: 'enum', enum: DisputeDecision, default: DisputeDecision.PENDING })
  decision: DisputeDecision;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  refundAmount: number;

  @Column({ type: 'text', nullable: true })
  refundReason: string;

  @Column({ type: 'timestamp', nullable: true })
  resolvedAt: Date;

  @Column({ type: 'json', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
