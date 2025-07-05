// src/services/notification/ConsoleNotificationService.ts

import {
  INotificationService,
  NotificationMessage,
} from './INotificationService';

export class ConsoleNotificationService implements INotificationService {
  async send(message: NotificationMessage): Promise<void> {
    const { to, subject, body, channel } = message;

    let output = `[NOTIFICATION] → ${channel.toUpperCase()} to ${to}\n`;
    if (subject) {
      output += `Subject: ${subject}\n`;
    }
    output += `Message: ${body}\n`;

    console.log(output);
  }
}
