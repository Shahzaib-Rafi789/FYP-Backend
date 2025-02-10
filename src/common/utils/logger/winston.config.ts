import * as winston from 'winston';
import 'winston-daily-rotate-file';
import 'winston-mongodb';


// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, context }) => {
    return `[${timestamp}] [${level.toUpperCase()}]${context ? ` [${context}]` : ''}: ${message}`;
  }),
);

// Configure Winston logger
export const winstonLogger = winston.createLogger({
  level: 'info', // Log only info and above (error, warn, etc.)
  format: logFormat,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        logFormat,
      ),
    }),
    // new winston.transports.DailyRotateFile({
    //   dirname: 'logs',
    //   filename: 'application-%DATE%.log',
    //   datePattern: 'YYYY-MM-DD',
    //   maxFiles: '7d', // Keep logs for 7 days
    //   zippedArchive: true,
    // }),
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
