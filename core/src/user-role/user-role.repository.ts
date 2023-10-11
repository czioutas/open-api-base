import { UserRoleEntity } from '@app/user-role/entities/user-role.entity';
import { Injectable, Scope } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class UserRoleRepository extends Repository<UserRoleEntity> {
  constructor(dataSource: DataSource) {
    super(UserRoleEntity, dataSource.createEntityManager());
  }
}
