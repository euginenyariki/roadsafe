import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Provider } from './entities/provider.entity';
import { Vehicle } from './entities/vehicle.entity';
import { ServiceRequest } from './entities/service-request.entity';
import { Booking } from './entities/booking.entity';
import { BookingStatusHistory } from './entities/booking-status-history.entity';
import { Quote } from './entities/quote.entity';
import { Payment } from './entities/payment.entity';
import { Transaction } from './entities/transaction.entity';
import { Wallet } from './entities/wallet.entity';
import { WalletTransaction } from './entities/wallet-transaction.entity';
import { Rating } from './entities/rating.entity';
import { Dispute } from './entities/dispute.entity';
import { Notification } from './entities/notification.entity';
import { Message } from './entities/message.entity';
import { MaintenanceRecord } from './entities/maintenance-record.entity';
import { FleetAccount } from './entities/fleet-account.entity';
import { AuditLog } from './entities/audit-log.entity';
import { SystemSetting } from './entities/system-setting.entity';

const entities = [
  User,
  Provider,
  Vehicle,
  ServiceRequest,
  Booking,
  BookingStatusHistory,
  Quote,
  Payment,
  Transaction,
  Wallet,
  WalletTransaction,
  Rating,
  Dispute,
  Notification,
  Message,
  MaintenanceRecord,
  FleetAccount,
  AuditLog,
  SystemSetting,
];

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USER || 'roadsafe',
  password: process.env.DATABASE_PASSWORD || 'password',
  database: process.env.DATABASE_NAME || 'roadsafe',
  entities,
  migrations: ['src/migrations/**/*.ts'],
  logging: process.env.DATABASE_LOGGING === 'true',
  synchronize: false,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export default AppDataSource;
