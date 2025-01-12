import { Module } from '@nestjs/common';
import { DatabaseConfig } from '../config/database.config';
import { DatabaseService } from './database.service';

@Module({
  imports: [DatabaseConfig],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
