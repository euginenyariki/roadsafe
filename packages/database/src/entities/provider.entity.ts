import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Index } from 'typeorm';
import { Booking } from './booking.entity';

export enum ProviderType {
  MECHANIC = 'MECHANIC',
  GARAGE = 'GARAGE',
  TOW_OPERATOR = 'TOW_OPERATOR',
  FUEL_PROVIDER = 'FUEL_PROVIDER',
  BATTERY_PROVIDER = 'BATTERY_PROVIDER',
  TYRE_PROVIDER = 'TYRE_PROVIDER',
  AUTO_ELECTRICIAN = 'AUTO_ELECTRICIAN',
  LOCKSMITH = 'LOCKSMITH',
  RECOVERY_PROVIDER = 'RECOVERY_PROVIDER',
  PARTS_SELLER = 'PARTS_SELLER',
  DETAILER = 'DETAILER',
}

export enum ProviderStatus {
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
  SUSPENDED = 'SUSPENDED',
  INACTIVE = 'INACTIVE',
}

@Entity('providers')
@Index(['userId'])
@Index(['status'])
@Index(['providerType'])
@Index(['location'], { spatial: true })
export class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'varchar', length: 255 })
  businessName: string;

  @Column({ type: 'text', nullable: true })
  businessDescription: string;

  @Column({ type: 'enum', enum: ProviderType })
  providerType: ProviderType;

  @Column({ type: 'enum', enum: ProviderStatus, default: ProviderStatus.PENDING })
  status: ProviderStatus;

  @Column({ type: 'text', nullable: true })
  businessLogo: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  businessRegistration: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  taxId: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  businessEmail: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  businessPhone: string;

  @Column({ type: 'text', nullable: true })
  businessAddress: string;

  @Column({ type: 'geography', spatialFeatureType: 'Point', nullable: true })
  location: { type: 'Point'; coordinates: [number, number] };

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 50 })
  serviceRadiusKm: number;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  averageRating: number;

  @Column({ type: 'integer', default: 0 })
  totalRatings: number;

  @Column({ type: 'integer', default: 0 })
  completedJobs: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 100 })
  acceptanceRate: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  cancellationRate: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 100 })
  reliabilityScore: number;

  @Column({ type: 'json', default: [] })
  services: Array<{ id: string; name: string; price: number }>;

  @Column({ type: 'json', default: {} })
  operatingHours: Record<string, { open: string; close: string }>;

  @Column({ type: 'boolean', default: false })
  isOnline: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lastOnlineAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  currentLocation: string;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  currentLatitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  currentLongitude: number;

  @Column({ type: 'json', default: [] })
  documentUrls: string[];

  @Column({ type: 'timestamp', nullable: true })
  verifiedAt: Date;

  @Column({ type: 'uuid', nullable: true })
  verifiedBy: string;

  @Column({ type: 'text', nullable: true })
  verificationNotes: string;

  @Column({ type: 'timestamp', nullable: true })
  suspendedAt: Date;

  @Column({ type: 'uuid', nullable: true })
  suspendedBy: string;

  @Column({ type: 'text', nullable: true })
  suspensionReason: string;

  @Column({ type: 'json', default: {} })
  bankDetails: {
    accountName?: string;
    accountNumber?: string;
    bankName?: string;
    branch?: string;
  };

  @Column({ type: 'json', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @OneToMany(() => Booking, (booking) => booking.provider)
  bookings: Booking[];
}
