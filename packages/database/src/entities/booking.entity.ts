import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, Index } from 'typeorm';
import { User } from './user.entity';
import { ServiceRequest } from './service-request.entity';
import { Provider } from './provider.entity';
import { Quote } from './quote.entity';
import { BookingStatusHistory } from './booking-status-history.entity';
import { Payment } from './payment.entity';

export enum BookingStatus {
  REQUESTED = 'REQUESTED',
  SEARCHING = 'SEARCHING',
  PROVIDER_NOTIFIED = 'PROVIDER_NOTIFIED',
  ACCEPTED = 'ACCEPTED',
  EN_ROUTE = 'EN_ROUTE',
  ARRIVED = 'ARRIVED',
  DIAGNOSING = 'DIAGNOSING',
  QUOTE_PENDING = 'QUOTE_PENDING',
  CUSTOMER_APPROVAL_REQUIRED = 'CUSTOMER_APPROVAL_REQUIRED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  PAYMENT_PENDING = 'PAYMENT_PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
  PROVIDER_CANCELLED = 'PROVIDER_CANCELLED',
  CUSTOMER_CANCELLED = 'CUSTOMER_CANCELLED',
  NO_SHOW = 'NO_SHOW',
  DISPUTED = 'DISPUTED',
  REFUNDED = 'REFUNDED',
}

@Entity('bookings')
@Index(['customerId'])
@Index(['providerId'])
@Index(['status'])
@Index(['serviceRequestId'])
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  serviceRequestId: string;

  @Column({ type: 'uuid' })
  customerId: string;

  @Column({ type: 'uuid', nullable: true })
  providerId: string;

  @Column({ type: 'enum', enum: BookingStatus, default: BookingStatus.REQUESTED })
  status: BookingStatus;

  @Column({ type: 'varchar', length: 20 })
  bookingReference: string;

  @Column({ type: 'timestamp', nullable: true })
  acceptedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  arrivedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  cancelledAt: Date;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  providerLatitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  providerLongitude: number;

  @Column({ type: 'timestamp', nullable: true })
  lastLocationUpdate: Date;

  @Column({ type: 'integer', nullable: true })
  estimatedArrivalSeconds: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  basePrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  additionalCharges: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  discount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  platformFee: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  tax: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  totalAmount: number;

  @Column({ type: 'text', nullable: true })
  cancellationReason: string;

  @Column({ type: 'uuid', nullable: true })
  cancelledBy: string;

  @Column({ type: 'json', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ServiceRequest, (sr) => sr.bookings)
  serviceRequest: ServiceRequest;

  @ManyToOne(() => User, (user) => user.customerBookings)
  customer: User;

  @ManyToOne(() => Provider, (provider) => provider.bookings)
  provider: Provider;

  @OneToMany(() => BookingStatusHistory, (history) => history.booking)
  statusHistory: BookingStatusHistory[];

  @OneToMany(() => Quote, (quote) => quote.booking)
  quotes: Quote[];

  @OneToMany(() => Payment, (payment) => payment.booking)
  payments: Payment[];
}
