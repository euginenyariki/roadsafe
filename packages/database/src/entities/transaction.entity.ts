import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, Index } from 'typeorm';
import { Payment } from './payment.entity';

export enum TransactionType {
  PAYMENT = 'PAYMENT',
  REFUND = 'REFUND',
  PLATFORM_FEE = 'PLATFORM_FEE',
  PROVIDER_PAYOUT = 'PROVIDER_PAYOUT',
  WALLET_TOPUP = 'WALLET_TOPUP',
  WALLET_WITHDRAWAL = 'WALLET_WITHDRAWAL',
}

@Entity('transactions')
@Index(['paymentId'])
@Index(['type'])
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  paymentId: string;

  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'varchar', length: 3, default: 'KES' })
  currency: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'json', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Payment, (payment) => payment.transactions, { nullable: true })
  payment: Payment;
}
