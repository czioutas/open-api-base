import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class UserDto {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
