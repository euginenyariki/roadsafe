import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export enum NotificationChannel {
  PUSH = 'PUSH',
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  WHATSAPP = 'WHATSAPP',
  IN_APP = 'IN_APP',
}

export interface SendNotificationDto {
  userId: string;
  title: string;
  message: string;
  channels: NotificationChannel[];
  relatedBookingId?: string;
  metadata?: Record<string, any>;
}

@Injectable()
export class NotificationService {
  constructor(private configService: ConfigService) {}

  async send(dto: SendNotificationDto): Promise<boolean> {
    try {
      // For each channel, execute the appropriate send method
      const results = await Promise.allSettled(
        dto.channels.map((channel) => this.sendToChannel(channel, dto)),
      );

      return results.some((result) => result.status === 'fulfilled');
    } catch (error) {
      console.error('Failed to send notification:', error);
      return false;
    }
  }

  private async sendToChannel(channel: NotificationChannel, dto: SendNotificationDto) {
    switch (channel) {
      case NotificationChannel.PUSH:
        return this.sendPushNotification(dto);
      case NotificationChannel.SMS:
        return this.sendSMS(dto);
      case NotificationChannel.EMAIL:
        return this.sendEmail(dto);
      case NotificationChannel.WHATSAPP:
        return this.sendWhatsApp(dto);
      case NotificationChannel.IN_APP:
        return this.saveInAppNotification(dto);
      default:
        return false;
    }
  }

  private async sendPushNotification(dto: SendNotificationDto): Promise<boolean> {
    // Mock implementation - configure with real push service
    console.log(`[PUSH] to user ${dto.userId}: ${dto.title}`);
    return true;
  }

  private async sendSMS(dto: SendNotificationDto): Promise<boolean> {
    // Mock implementation - configure with SMS provider (Africastalking, Twilio, etc.)
    console.log(`[SMS] to user ${dto.userId}: ${dto.message}`);
    return true;
  }

  private async sendEmail(dto: SendNotificationDto): Promise<boolean> {
    // Mock implementation - configure with email provider
    console.log(`[EMAIL] to user ${dto.userId}: ${dto.title}`);
    return true;
  }

  private async sendWhatsApp(dto: SendNotificationDto): Promise<boolean> {
    // Mock implementation - configure with WhatsApp Business API
    console.log(`[WHATSAPP] to user ${dto.userId}: ${dto.message}`);
    return true;
  }

  private async saveInAppNotification(dto: SendNotificationDto): Promise<boolean> {
    // This will be properly implemented in the notifications module
    console.log(`[IN-APP] to user ${dto.userId}: ${dto.title}`);
    return true;
  }
}
