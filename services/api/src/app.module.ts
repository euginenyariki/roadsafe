import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import * as Joi from 'joi';

// Database imports
import { AppDataSource } from '@database/database.config';
import * as AllEntities from '@database/index';

// Module imports
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProvidersModule } from './modules/providers/providers.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { RequestsModule } from './modules/requests/requests.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { RatingsModule } from './modules/ratings/ratings.module';
import { DisputesModule } from './modules/disputes/disputes.module';
import { AdminModule } from './modules/admin/admin.module';
import { HealthModule } from './modules/health/health.module';

// Service imports
import { DatabaseService } from './services/database.service';
import { LoggerService } from './services/logger.service';
import { NotificationService } from './services/notification.service';
import { DispatchService } from './services/dispatch.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test'),
        API_PORT: Joi.number().default(3001),
        DATABASE_URL: Joi.string().required(),
        REDIS_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        MPESA_ENVIRONMENT: Joi.string().valid('sandbox', 'production').default('sandbox'),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST', 'localhost'),
        port: configService.get('DATABASE_PORT', 5432),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: Object.values(AllEntities).filter((item) => item.prototype),
        synchronize: configService.get('NODE_ENV') === 'development',
        logging: configService.get('DATABASE_LOGGING', false),
        ssl: configService.get('NODE_ENV') === 'production',
      }),
    }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST', 'localhost'),
          port: configService.get('REDIS_PORT', 6379),
          password: configService.get('REDIS_PASSWORD'),
        },
      }),
    }),
    ScheduleModule.forRoot(),

    // Feature modules
    AuthModule,
    UsersModule,
    ProvidersModule,
    VehiclesModule,
    RequestsModule,
    BookingsModule,
    PaymentsModule,
    RatingsModule,
    DisputesModule,
    AdminModule,
    HealthModule,
  ],
  providers: [DatabaseService, LoggerService, NotificationService, DispatchService],
})
export class AppModule {}
