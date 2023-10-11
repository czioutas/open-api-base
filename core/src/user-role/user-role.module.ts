import { UserRoleEntity } from '@app/user-role/entities/user-role.entity';
import { UserRoleProfile } from '@app/user-role/user-role.profile';
import { UserRoleRepository } from '@app/user-role/user-role.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoleService } from './user-role.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoleEntity])],
  providers: [UserRoleService, UserRoleRepository, UserRoleProfile],
  exports: [UserRoleService],
})
export class UserRoleModule {}
