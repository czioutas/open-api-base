import { UserEntity } from '@app/users/user.entity';
import { UserProfile } from '@app/users/user.profile';
import { UserRepository } from '@app/users/user.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserRepository, UserProfile],
  exports: [UserService],
})
export class UserModule {}
