import { BaseEntity } from '@app/lib/base.entity';
import { UserRoleEntity } from '@app/user-role/entities/user-role.entity';
import { AutoMap } from '@automapper/classes';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  @Column({
    nullable: true,
  })
  @AutoMap()
  firstName: string;

  @Column({
    nullable: true,
  })
  @AutoMap()
  lastName: string;

  @Column()
  @AutoMap()
  email: string;

  @ManyToMany(() => UserRoleEntity, { cascade: true, nullable: true })
  @JoinTable()
  @AutoMap()
  roles: UserRoleEntity[];
}
