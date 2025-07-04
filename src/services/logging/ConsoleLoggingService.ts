// src/services/logging/ConsoleLoggingService.ts

import { ILoggingService, LogEntry } from './ILoggingService';

export class ConsoleLoggingService implements ILoggingService {
  async log(entry: LogEntry): Promise<void> {
    const { level, message, context, timestamp } = entry;
    const prefix = `[${timestamp.toISOString()}] [${level.toUpperCase()}]`;
    const fullMessage = context
      ? `${prefix} ${message} ${JSON.stringify(context)}`
      : `${prefix} ${message}`;

    // Use appropriate console method
    switch (level) {
      case 'info':
        console.info(fullMessage);
        break;
      case 'warn':
        console.warn(fullMessage);
        break;
      case 'error':
        console.error(fullMessage);
        break;
    }
  }

  async info(
    message: string,
    context?: Record<string, unknown>
  ): Promise<void> {
    return this.log({ level: 'info', message, context, timestamp: new Date() });
  }

  async warn(
    message: string,
    context?: Record<string, unknown>
  ): Promise<void> {
    return this.log({ level: 'warn', message, context, timestamp: new Date() });
  }

  async error(
    message: string,
    context?: Record<string, unknown>
  ): Promise<void> {
    return this.log({
      level: 'error',
      message,
      context,
      timestamp: new Date(),
    });
  }
}
