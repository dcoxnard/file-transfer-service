// src/services/notification/INotificationService.ts

export type NotificationChannel = 'email' | 'sms' | 'push';

export interface NotificationMessage {
  readonly to: string; // recipient identifier: email address, phone number, or device token
  readonly subject?: string; // optional for non-email channels
  readonly body: string;
  readonly channel: NotificationChannel;
}

export interface INotificationService {
  send(message: NotificationMessage): Promise<void>;
}
