import { CreateUserDto } from '@app/users/dto/create-user.dto';
import { UserDto } from '@app/users/dto/user.dto';
import { UserEntity } from '@app/users/user.entity';
import { UserRepository } from '@app/users/user.repository';
import { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { InjectMapper } from '@timonmasberg/automapper-nestjs';

@Injectable()
export class UserService {
  constructor(
    private repository: UserRepository,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  async findOneByEmailAsync(email: string): Promise<UserDto | null> {
    const userEntity = await this.repository.findOneBy({ email: email });

    return await this.classMapper.mapAsync(userEntity, UserEntity, UserDto);
  }

  async findOneByIdAsync(id: string): Promise<UserDto> {
    const userEntity = await this.repository.findOneBy({ id: id });

    return await this.classMapper.mapAsync(userEntity, UserEntity, UserDto);
  }

  async createAsync(createDto: CreateUserDto): Promise<UserDto> {
    let userEntity: UserEntity = await this.classMapper.mapAsync(createDto, CreateUserDto, UserEntity);

    userEntity = await this.repository.save(userEntity);

    return await this.classMapper.mapAsync(userEntity, UserEntity, UserDto);
  }
}
