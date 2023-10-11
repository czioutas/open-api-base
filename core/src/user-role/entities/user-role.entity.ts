import { Permission } from '@app/auth/permission.enum';
import { BaseEntity } from '@app/lib/base.entity';
import { AutoMap } from '@automapper/classes';
import { Column, Entity } from 'typeorm';

@Entity()
export class UserRoleEntity extends BaseEntity {
  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column({
    type: 'enum',
    enum: Permission,
    default: [],
    nullable: false,
    array: true,
  })
  permissions: Permission[];
}
