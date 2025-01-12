import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  startApp(): string {
    return 'Project Status: Online';
  }
}
