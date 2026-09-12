import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Index } from 'typeorm';
import { Vehicle } from './vehicle.entity';

export enum MaintenanceType {
  OIL_SERVICE = 'OIL_SERVICE',
  BRAKE_SERVICE = 'BRAKE_SERVICE',
  TYRE_SERVICE = 'TYRE_SERVICE',
  BATTERY = 'BATTERY',
  COOLANT = 'COOLANT',
  INSPECTION = 'INSPECTION',
  OTHER = 'OTHER',
}

@Entity('maintenance_records')
@Index(['vehicleId'])
export class MaintenanceRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  vehicleId: string;

  @Column({ type: 'enum', enum: MaintenanceType })
  type: MaintenanceType;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'integer', nullable: true })
  mileageAtService: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  cost: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  provider: string;

  @Column({ type: 'text', nullable: true })
  receiptUrl: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'timestamp', nullable: true })
  nextDueDate: Date;

  @Column({ type: 'integer', nullable: true })
  nextDueMileage: number;

  @Column({ type: 'json', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.maintenanceRecords)
  vehicle: Vehicle;
}
