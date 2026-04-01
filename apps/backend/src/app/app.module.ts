import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DATABASE_CONFIG, getDatabaseConfig } from './database.config';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: DATABASE_CONFIG,
      useFactory: getDatabaseConfig,
    },
  ],
})
export class AppModule {}
