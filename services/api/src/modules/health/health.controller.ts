import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('health')
export class HealthController {
  constructor(private configService: ConfigService) {}

  @Get()
  health() {
    return {
      status: 'ok',
      service: this.configService.get('APP_NAME'),
      version: this.configService.get('APP_VERSION'),
      timestamp: new Date().toISOString(),
    };
  }

  @Get('ready')
  ready() {
    return {
      ready: true,
      timestamp: new Date().toISOString(),
    };
  }
}
