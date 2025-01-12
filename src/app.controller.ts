import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Get()
  async execute(): Promise<string> {
    const isDbHealthy = await this.databaseService.isDatabaseHealthy();
    const databaseStatus = `Database Status: ${isDbHealthy ? 'Online' : 'Offline'}`;
    const message = `${this.appService.startApp()}\n${databaseStatus}`;

    return message;
  }
}
