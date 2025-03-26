import { Injectable, LoggerService, Scope } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import 'winston-mongodb';

@Injectable({ scope: Scope.DEFAULT })
export class AppLogger implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info', // Default level (can be changed dynamically)
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        // Console Logging
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),

        // // File Rotation (Daily)
        // new winston.transports.DailyRotateFile({
        //   filename: 'logs/application-%DATE%.log',
        //   datePattern: 'YYYY-MM-DD',
        //   maxSize: '20m',
        //   maxFiles: '14d', // Keep logs for 14 days
        // }),

        // MongoDB Logging
        new winston.transports.MongoDB({
          db: 'mongodb+srv://BandUp:iY3DaAQ504lErCbo@cluster0.fmlnz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', // Separate MongoDB for logs
          //   options: { useUnifiedTopology: true },
          collection: 'app_logs',
          level: 'error', // Log only errors to MongoDB
          capped: true, // Enables capped collection
          cappedSize: 10485760, // 10MB max size
        }),
      ],
    });
  }

  log(message: string, context?: string) {
    this.logger.info({ message, context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error({ message, trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn({ message, context });
  }

  debug(message: string, context?: string) {
    this.logger.debug({ message, context });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose({ message, context });
  }
}
