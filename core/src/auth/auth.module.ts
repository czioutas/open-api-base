import { JWT_CONFIG, JwtConfig } from '@app/app.config';
import { JwtMagicLinkStrategy } from '@app/auth/strategies/jwt-magiclink.strategy';
import { JwtRefreshStrategy } from '@app/auth/strategies/jwt-refresh.strategy';
import { JwtStrategy } from '@app/auth/strategies/jwt.strategy';
import { UserModule } from '@app/users/user.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const jwtConfig = configService.get<JwtConfig>(JWT_CONFIG);
        return {
          signOptions: {
            issuer: jwtConfig.issuer,
            audience: jwtConfig.audience,
          },
        };
      },
    }),
  ],
  providers: [AuthService, JwtMagicLinkStrategy, JwtRefreshStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
