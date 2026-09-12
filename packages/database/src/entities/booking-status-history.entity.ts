import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, Index } from 'typeorm';
import { Booking } from './booking.entity';
import { BookingStatus } from './booking.entity';

@Entity('booking_status_history')
@Index(['bookingId'])
export class BookingStatusHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  bookingId: string;

  @Column({ type: 'enum', enum: BookingStatus })
  status: BookingStatus;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @Column({ type: 'json', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Booking, (booking) => booking.statusHistory)
  booking: Booking;
}
