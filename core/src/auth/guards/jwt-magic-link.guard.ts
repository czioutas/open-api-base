import { JwtMagiclinkStrategy } from '@app/auth/strategies/jwt-magiclink.strategy';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtMagicLinkGuard extends AuthGuard(JwtMagiclinkStrategy) {}
