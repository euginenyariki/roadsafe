import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

export enum FleetStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

@Entity('fleet_accounts')
@Index(['companyName'])
@Index(['status'])
export class FleetAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  companyName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'uuid' })
  accountOwner: string;

  @Column({ type: 'enum', enum: FleetStatus, default: FleetStatus.ACTIVE })
  status: FleetStatus;

  @Column({ type: 'varchar', length: 20, nullable: true })
  registrationNumber: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  taxId: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'integer', default: 0 })
  totalVehicles: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  monthlyBudget: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  monthlySpending: number;

  @Column({ type: 'json', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
