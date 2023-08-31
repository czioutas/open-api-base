import { BaseEntity } from '@app/lib/base.entity';
import { AutoMap } from '@automapper/classes';
import { Column, Entity } from 'typeorm';

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
}
