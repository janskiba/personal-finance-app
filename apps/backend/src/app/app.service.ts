import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONFIG, type DatabaseConfig } from './database.config';

@Injectable()
export class AppService {
  constructor(
    @Inject(DATABASE_CONFIG)
    private readonly databaseConfig: DatabaseConfig,
  ) {}

  getData(): { message: string } {
    void this.databaseConfig;
    return { message: 'Hello API' };
  }
}
