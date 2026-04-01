import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DATABASE_CONFIG } from './database.config';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: DATABASE_CONFIG,
          useValue: {
            host: 'localhost',
            port: 5432,
            name: 'personal_finance',
            user: 'personal_finance_user',
            password: 'personal_finance_password',
            url: 'postgresql://personal_finance_user:personal_finance_password@localhost:5432/personal_finance',
          },
        },
      ],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
