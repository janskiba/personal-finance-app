import { Test } from '@nestjs/testing';
import { AppService } from './app.service';
import { DATABASE_CONFIG } from './database.config';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
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

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
