import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Index } from 'typeorm';
import { Booking } from './booking.entity';

export enum QuoteStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
}

@Entity('quotes')
@Index(['bookingId'])
export class Quote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  bookingId: string;

  @Column({ type: 'varchar', length: 20 })
  quoteReference: string;

  @Column({ type: 'enum', enum: QuoteStatus, default: QuoteStatus.PENDING })
  status: QuoteStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  baseService: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  travel: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  labour: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  parts: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  other: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  tax: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'json', default: [] })
  items: Array<{ description: string; quantity: number; unitPrice: number }>;

  @Column({ type: 'timestamp', nullable: true })
  validUntil: Date;

  @Column({ type: 'timestamp', nullable: true })
  acceptedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  rejectedAt: Date;

  @Column({ type: 'text', nullable: true })
  rejectionReason: string;

  @Column({ type: 'json', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Booking, (booking) => booking.quotes)
  booking: Booking;
}
