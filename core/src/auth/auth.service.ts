import { JWT_CONFIG, JwtConfig } from '@app/app.config';
import { AuthSuccessDto } from '@app/auth/dto/auth-success.dto';
import { RefreshTokenPayload } from '@app/auth/dto/refresh-token-payload.dto';
import { TokenPayloadDto } from '@app/auth/dto/token-payload.dto';
import { Permission } from '@app/auth/permission.enum';
import { EmailService } from '@app/communication/email.service';
import { EmailTemplate } from '@app/communication/email_templates.enum';
import { UserDto } from '@app/users/dto/user.dto';
import { UserService } from '@app/users/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly jwtConfig: JwtConfig;

  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
    configService: ConfigService,
    private emailService: EmailService,
  ) {
    this.jwtConfig = configService.get<JwtConfig>(JWT_CONFIG);
  }

  /**
   * Requests for magic login to be sent to the user.
   * @param {string} email : The email of the user.
   */
  async requestEmailMagicLoginAsync(email: string): Promise<void> {
    let user = await this.userService.findOneByEmailAsync(email);

    if (!user) {
      user = await this.userService.createAsync({ email: email });
    }

    await this.sendLoginEmailAsync(user);

    return;
  }

  private async sendLoginEmailAsync(userDto: UserDto): Promise<void> {
    const loginToken = await this.createTokenForMagicLinkAsync(userDto);

    const magicLink = `/auth/magiclink-callback/?token=${loginToken}`;
    await this.emailService.sendEmailAsync(userDto.email, EmailTemplate.MagicLinkEmail, {
      magicLink,
    });
  }

  async createTokenForMagicLinkAsync(userDto: UserDto): Promise<string> {
    return await this.jwtService.signAsync(
      { ...userDto },
      {
        subject: userDto.id ?? '',
        secret: this.jwtConfig.magicLinkTokenSecret,
        expiresIn: this.jwtConfig.magicLinkTokenExpiration,
      },
    );
  }

  /**
   * Validates if the user with the requested data exists.
   * @param {string} email - The email of the user to validate
   * @returns {UserDto} The validated User.
   */
  async validateUser(email: string): Promise<UserDto> {
    const user = await this.userService.findOneByEmailAsync(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async generateAuthenticatedTokenBundleAsync(userDto: UserDto): Promise<AuthSuccessDto> {
    const tokenPayload = this.createIdTokenPayload(userDto);
    const idToken = await this.jwtService.signAsync(tokenPayload, {
      expiresIn: this.jwtConfig.idTokenExpiration,
      secret: this.jwtConfig.idTokenSecret,
    });
    const refreshToken = await this.createRefreshTokenAsync(userDto.id);

    return { idToken, refreshToken, userId: userDto.id };
  }

  private createIdTokenPayload(userDto: UserDto): TokenPayloadDto {
    const p1: TokenPayloadDto = {
      email: userDto.email,
      sub: userDto.id,
      name: userDto.firstName + ' ' + userDto.lastName,
      given_name: userDto.firstName,
      family_name: userDto.lastName,
      permissions: [] as Permission[],
      roles: [] as string[],
    };

    return p1;
  }

  async refreshIdTokenAsync(id: string): Promise<AuthSuccessDto> {
    const user = await this.userService.findOneByIdAsync(id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return await this.generateAuthenticatedTokenBundleAsync(user);
  }

  private async createRefreshTokenAsync(applicationUserId: string): Promise<string> {
    const payload: RefreshTokenPayload = {
      sub: applicationUserId,
    };
    return await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.refreshIdTokenSecret,
      expiresIn: this.jwtConfig.refreshIdTokenExpiration,
    });
  }
}
