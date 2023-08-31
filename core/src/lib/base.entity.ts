import { AutoMap } from '@automapper/classes';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 3,
  })
  @AutoMap()
  createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 3,
  })
  @AutoMap()
  updatedAt?: Date;
}
