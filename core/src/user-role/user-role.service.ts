import { UserRoleDto } from '@app/user-role/dto/user-role.dto';
import { UserRoleEntity } from '@app/user-role/entities/user-role.entity';
import { Role } from '@app/user-role/roles';
import { UserRoleRepository } from '@app/user-role/user-role.repository';
import { Mapper } from '@automapper/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@timonmasberg/automapper-nestjs';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Injectable()
export class UserRoleService {
  constructor(
    private repository: UserRoleRepository,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  test() {
    console.log('a');
  }

  async createAsync(createUserRoleDto: CreateUserRoleDto): Promise<UserRoleDto> {
    let userRoleEntity: UserRoleEntity = await this.classMapper.mapAsync(
      createUserRoleDto,
      CreateUserRoleDto,
      UserRoleEntity,
    );

    userRoleEntity = await this.repository.save(userRoleEntity);

    return await this.classMapper.mapAsync(userRoleEntity, UserRoleEntity, UserRoleDto);
  }

  async findAllAsync(): Promise<UserRoleDto[]> {
    const userRoleEntity = await this.repository.find();

    return await this.classMapper.mapArrayAsync(userRoleEntity, UserRoleEntity, UserRoleDto);
  }

  async findOneAsync(id: string): Promise<UserRoleDto> {
    const userRoleEntity = await this.repository.findOneBy({ id: id });

    return await this.classMapper.mapAsync(userRoleEntity, UserRoleEntity, UserRoleDto);
  }

  async updateAsync(id: string, updateUserRoleDto: UpdateUserRoleDto): Promise<UserRoleDto> {
    let userRoleEntity = await this.repository.findOneBy({ id: id });

    if (!userRoleEntity) {
      throw new NotFoundException('User Role does not exist.');
    }

    userRoleEntity = await this.repository.save({ id: id, ...updateUserRoleDto });

    return await this.classMapper.mapAsync(userRoleEntity, UserRoleEntity, UserRoleDto);
  }

  async removeByBaneAsync(name: string): Promise<void> {
    const userRoleEntity = await this.repository.findOneBy({ name: name.toString().toLowerCase() });

    if (!userRoleEntity) {
      throw new NotFoundException('User Role does not exist.');
    }

    await this.repository.remove(userRoleEntity);
  }

  async removeAsync(id: string): Promise<void> {
    const userRoleEntity = await this.repository.findOneBy({ id: id });

    if (!userRoleEntity) {
      throw new NotFoundException('User Role does not exist.');
    }

    await this.repository.remove(userRoleEntity);
  }

  async createDefaultRolesAsync(): Promise<void> {
    // Admin
    const adminRoleEntity = await this.repository.findOneBy({ name: Role.ADMIN.toString().toLowerCase() });
    if (!adminRoleEntity) {
      const adminCreateDto: CreateUserRoleDto = {
        name: Role.ADMIN.toString().toLowerCase(),
        permissions: [],
      };
      await this.createAsync(adminCreateDto);
    }

    // User
    const userRoleEntity = await this.repository.findOneBy({ name: Role.USER.toString().toLowerCase() });
    if (!userRoleEntity) {
      const adminCreateDto: CreateUserRoleDto = {
        name: Role.USER.toString().toLowerCase(),
        permissions: [],
      };
      await this.createAsync(adminCreateDto);
    }
  }
}
