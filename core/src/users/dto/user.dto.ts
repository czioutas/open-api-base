import { AutoMap } from '@automapper/classes';
import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class UserDto {
  @IsUUID()
  @AutoMap()
  id: string;

  @IsNotEmpty()
  @AutoMap()
  firstName: string;

  @IsNotEmpty()
  @AutoMap()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @AutoMap()
  email: string;
}
