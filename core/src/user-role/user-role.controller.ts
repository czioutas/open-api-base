import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRoleService } from './user-role.service';

@ApiTags('User Roles')
@Controller({
  path: 'user-role',
  version: '1',
})
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createUserRoleDto: CreateUserRoleDto) {
    return await this.userRoleService.createAsync(createUserRoleDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return await this.userRoleService.findAllAsync();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userRoleService.findOneAsync(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserRoleDto: UpdateUserRoleDto) {
    return await this.userRoleService.updateAsync(id, updateUserRoleDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userRoleService.removeAsync(id);
  }
}
