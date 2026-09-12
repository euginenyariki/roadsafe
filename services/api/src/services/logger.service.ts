import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggerService {
  private readonly logger = new Logger(LoggerService.name);

  constructor(private configService: ConfigService) {}

  log(message: string, context?: string) {
    this.logger.log(message, context || 'APP');
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, trace, context || 'APP');
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, context || 'APP');
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, context || 'APP');
  }
}
