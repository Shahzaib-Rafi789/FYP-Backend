import { Injectable, LoggerService as NestLogger } from '@nestjs/common';
import { winstonLogger } from './winston.config';

@Injectable()
export class LoggerService implements NestLogger {
  log(message: string, context?: string) {
    winstonLogger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    winstonLogger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    winstonLogger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    winstonLogger.debug(message, { context });
  }

  verbose(message: string, context?: string) {
    winstonLogger.verbose(message, { context });
  }
}
