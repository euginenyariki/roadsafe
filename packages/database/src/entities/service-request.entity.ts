import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, Index } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { Booking } from './booking.entity';

export enum ServiceType {
  MECHANIC = 'MECHANIC',
  TOWING = 'TOWING',
  FUEL_DELIVERY = 'FUEL_DELIVERY',
  BATTERY_ASSISTANCE = 'BATTERY_ASSISTANCE',
  TYRE_ASSISTANCE = 'TYRE_ASSISTANCE',
  AUTO_ELECTRICAL = 'AUTO_ELECTRICAL',
  VEHICLE_RECOVERY = 'VEHICLE_RECOVERY',
  LOCKOUT_ASSISTANCE = 'LOCKOUT_ASSISTANCE',
  GARAGE = 'GARAGE',
  SPARE_PARTS = 'SPARE_PARTS',
  CAR_WASH = 'CAR_WASH',
  DETAILING = 'DETAILING',
  INSPECTION = 'INSPECTION',
  OTHER = 'OTHER',
}

export enum RequestStatus {
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
  NO_SHOW = 'NO_SHOW',
  DISPUTED = 'DISPUTED',
}

@Entity('service_requests')
@Index(['customerId'])
@Index(['vehicleId'])
@Index(['status'])
@Index(['serviceType'])
export class ServiceRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  customerId: string;

  @Column({ type: 'uuid' })
  vehicleId: string;

  @Column({ type: 'enum', enum: ServiceType })
  serviceType: ServiceType;

  @Column({ type: 'enum', enum: RequestStatus, default: RequestStatus.REQUESTED })
  status: RequestStatus;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'geography', spatialFeatureType: 'Point' })
  location: { type: 'Point'; coordinates: [number, number] };

  @Column({ type: 'varchar', length: 255, nullable: true })
  locationName: string;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  longitude: number;

  @Column({ type: 'json', default: [] })
  photoUrls: string[];

  @Column({ type: 'text', nullable: true })
  voiceNoteUrl: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  estimatedPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  finalPrice: number;

  @Column({ type: 'boolean', default: false })
  isEmergency: boolean;

  @Column({ type: 'timestamp', nullable: true })
  acceptedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  cancelledAt: Date;

  @Column({ type: 'json', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Vehicle)
  vehicle: Vehicle;

  @OneToMany(() => Booking, (booking) => booking.serviceRequest)
  bookings: Booking[];
}
