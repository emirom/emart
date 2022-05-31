import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserModule],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it.skip('should be defined', () => {
    expect(service).toBeDefined();
  });
});