import { AuthService } from '@app/auth/auth.service';
import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let authController: AuthController;
  const authServiceMock = createMock<AuthService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(authServiceMock)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('should call authService.requestEmailMagicLoginAsync once', () => {
    authController.requestEmailLogin({ email: 'bob@bob.com' });
    expect(authServiceMock.requestEmailMagicLoginAsync).toHaveBeenCalledTimes(1);
  });
});
