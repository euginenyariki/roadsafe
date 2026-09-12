import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: process.env.NODE_ENV === 'production' ? ['error', 'warn'] : ['log', 'error', 'warn', 'debug'],
  });

  const configService = app.get(ConfigService);

  // Security middleware
  app.use(helmet());
  app.use(compression());

  // Enable CORS
  app.enableCors({
    origin: configService.get('CORS_ORIGIN', 'http://localhost:3000').split(','),
    credentials: true,
  });

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Swagger documentation
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle(configService.get('APP_NAME', 'RoadSafe'))
      .setDescription(`${configService.get('APP_NAME')} API Documentation`)
      .setVersion(configService.get('APP_VERSION', '1.0.0'))
      .addBearerAuth()
      .addTag('Authentication', 'User authentication endpoints')
      .addTag('Users', 'User management endpoints')
      .addTag('Providers', 'Provider marketplace endpoints')
      .addTag('Vehicles', 'Vehicle management endpoints')
      .addTag('Requests', 'Service request endpoints')
      .addTag('Bookings', 'Booking management endpoints')
      .addTag('Payments', 'Payment processing endpoints')
      .addTag('Ratings', 'Rating and review endpoints')
      .addTag('Disputes', 'Dispute resolution endpoints')
      .addTag('Admin', 'Admin operations endpoints')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  const port = configService.get('API_PORT', 3001);
  await app.listen(port);
  console.log(`🚀 ${configService.get('APP_NAME')} API running on port ${port}`);
}

bootstrap();
