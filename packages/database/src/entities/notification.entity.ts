import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

export enum NotificationType {
  REQUEST_RECEIVED = 'REQUEST_RECEIVED',
  PROVIDER_FOUND = 'PROVIDER_FOUND',
  PROVIDER_ACCEPTED = 'PROVIDER_ACCEPTED',
  PROVIDER_EN_ROUTE = 'PROVIDER_EN_ROUTE',
  PROVIDER_ARRIVED = 'PROVIDER_ARRIVED',
  QUOTE_RECEIVED = 'QUOTE_RECEIVED',
  QUOTE_APPROVED = 'QUOTE_APPROVED',
  JOB_COMPLETED = 'JOB_COMPLETED',
  PAYMENT_SUCCESSFUL = 'PAYMENT_SUCCESSFUL',
  PROVIDER_CANCELLED = 'PROVIDER_CANCELLED',
  DISPUTE_UPDATE = 'DISPUTE_UPDATE',
  VERIFICATION_APPROVED = 'VERIFICATION_APPROVED',
  VERIFICATION_REJECTED = 'VERIFICATION_REJECTED',
  VERIFICATION_REQUESTED = 'VERIFICATION_REQUESTED',
}

export enum NotificationChannel {
  PUSH = 'PUSH',
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  WHATSAPP = 'WHATSAPP',
  IN_APP = 'IN_APP',
}

@Entity('notifications')
@Index(['userId'])
@Index(['type'])
@Index(['read'])
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'enum', enum: NotificationType })
  type: NotificationType;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'enum', enum: NotificationChannel, array: true, default: ['IN_APP'] })
  channels: NotificationChannel[];

  @Column({ type: 'boolean', default: false })
  read: boolean;

  @Column({ type: 'timestamp', nullable: true })
  readAt: Date;

  @Column({ type: 'uuid', nullable: true })
  relatedBookingId: string;

  @Column({ type: 'uuid', nullable: true })
  relatedRequestId: string;

  @Column({ type: 'json', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
