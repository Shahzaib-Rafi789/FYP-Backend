import { Module } from '@nestjs/common';
import { DatabaseConfig } from '../config/database.config';
import { DatabaseService } from './database.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [DatabaseConfig],
  providers: [DatabaseService],
  exports: [DatabaseService, MongooseModule],
})
export class DatabaseModule {}
