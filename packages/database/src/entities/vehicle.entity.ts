import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, Index } from 'typeorm';
import { User } from './user.entity';
import { ServiceRequest } from './service-request.entity';
import { MaintenanceRecord } from './maintenance-record.entity';

export enum FuelType {
  PETROL = 'PETROL',
  DIESEL = 'DIESEL',
  HYBRID = 'HYBRID',
  ELECTRIC = 'ELECTRIC',
  LPG = 'LPG',
  CNG = 'CNG',
}

export enum TransmissionType {
  AUTOMATIC = 'AUTOMATIC',
  MANUAL = 'MANUAL',
  CVT = 'CVT',
}

@Entity('vehicles')
@Index(['ownerId'])
@Index(['registrationNumber'])
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  ownerId: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  registrationNumber: string;

  @Column({ type: 'varchar', length: 50 })
  make: string;

  @Column({ type: 'varchar', length: 50 })
  model: string;

  @Column({ type: 'integer' })
  year: number;

  @Column({ type: 'enum', enum: FuelType })
  fuelType: FuelType;

  @Column({ type: 'enum', enum: TransmissionType })
  transmissionType: TransmissionType;

  @Column({ type: 'varchar', length: 50, nullable: true })
  colour: string;

  @Column({ type: 'integer', nullable: true })
  mileage: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nickname: string;

  @Column({ type: 'text', nullable: true })
  photoUrl: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  chassisNumber: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  engineNumber: string;

  @Column({ type: 'boolean', default: false })
  isPrimary: boolean;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'json', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.vehicles)
  owner: User;

  @OneToMany(() => ServiceRequest, (request) => request.vehicle)
  serviceRequests: ServiceRequest[];

  @OneToMany(() => MaintenanceRecord, (record) => record.vehicle)
  maintenanceRecords: MaintenanceRecord[];
}
