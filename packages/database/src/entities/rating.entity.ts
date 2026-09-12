import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Index } from 'typeorm';
import { User } from './user.entity';
import { Booking } from './booking.entity';

@Entity('ratings')
@Index(['raterId'])
@Index(['recipientId'])
@Index(['bookingId'])
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  bookingId: string;

  @Column({ type: 'uuid' })
  raterId: string;

  @Column({ type: 'uuid' })
  recipientId: string;

  @Column({ type: 'integer', default: 5 })
  overallRating: number;

  @Column({ type: 'integer', nullable: true })
  arrivalRating: number;

  @Column({ type: 'integer', nullable: true })
  professionalismRating: number;

  @Column({ type: 'integer', nullable: true })
  communicationRating: number;

  @Column({ type: 'integer', nullable: true })
  priceTransparencyRating: number;

  @Column({ type: 'integer', nullable: true })
  serviceQualityRating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ type: 'boolean', default: false })
  isAnonymous: boolean;

  @Column({ type: 'json', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.givenRatings)
  rater: User;

  @ManyToOne(() => User, (user) => user.receivedRatings)
  recipient: User;

  @ManyToOne(() => Booking)
  booking: Booking;
}
