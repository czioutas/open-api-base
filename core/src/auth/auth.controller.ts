import { AuthService } from '@app/auth/auth.service';
import { Public } from '@app/auth/decorators/public.decorator';
import { AuthSuccessDto } from '@app/auth/dto/auth-success.dto';
import { AuthenticatedUserDto } from '@app/auth/dto/authenticated-user.dto';
import { RefreshUserDto } from '@app/auth/dto/refresh-user.dto';
import { RequestMagicLinkDto } from '@app/auth/dto/request-magic-link.dto';
import { JwtMagicLinkGuard } from '@app/auth/guards/jwt-magic-link.guard';
import { JwtRefreshGuard } from '@app/auth/guards/jwt-refresh.guard';
import { UserDto } from '@app/users/dto/user.dto';
import { Controller, Get, HttpCode, HttpStatus, Query, Request, UseGuards } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller({
  path: 'auth',
  version: '1',
})
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiQuery({
    name: 'email',
    description: 'The email of the application user that is trying to log in',
  })
  @Get('/request-email-login')
  async requestEmailLogin(@Query() { email }: RequestMagicLinkDto): Promise<void> {
    await this.authService.requestEmailMagicLoginAsync(email);
  }

  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse()
  @ApiQuery({
    name: 'token',
    description: 'The token that is used to get the access token (idToken). This token is sent to the user via email',
  })
  @ApiResponse({ type: AuthSuccessDto })
  @UseGuards(JwtMagicLinkGuard)
  @Get('/magiclink-callback')
  async magicLinkCallBack(@Request() { user }: { user: AuthenticatedUserDto }): Promise<AuthSuccessDto> {
    const userDto: UserDto = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    return await this.authService.generateAuthenticatedTokenBundleAsync(userDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse()
  @ApiQuery({
    name: 'token',
    description: 'The refresh token that is used to get a new access token (idToken).',
  })
  @UseGuards(JwtRefreshGuard)
  @Get('/refresh-id-token')
  async refreshIdToken(@Request() { user: { id } }: { user: RefreshUserDto }): Promise<AuthSuccessDto> {
    return this.authService.refreshIdTokenAsync(id);
  }
}
