import { IsEmail, IsNotEmpty } from 'class-validator';

/**
 * This Dto is used when a user requests a magic link.
 * Used exclusively by the `/request-email-login` endpoint in auth.controller.ts
 */
export class RequestMagicLinkDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
