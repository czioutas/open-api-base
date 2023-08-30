import { AutoMap } from '@automapper/classes';
import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @AutoMap()
  @IsEmail()
  email: string;
}
