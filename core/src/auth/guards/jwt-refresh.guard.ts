import { JwtRefreshStrategyName } from '@app/auth/strategies/jwt-refresh.strategy';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshGuard extends AuthGuard(JwtRefreshStrategyName) {}
