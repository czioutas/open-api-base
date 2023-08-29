import { UserDto } from '@app/users/dto/user.dto';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly users: UserDto[] = [
    {
      id: '751d2f8c-7d11-4003-816c-0081c5797cdd',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: 'bob@bob.com',
    },
    {
      id: '3cde466b-a5eb-40ad-8db1-7ea3d936d5ca',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
    },
    {
      id: 'e44c3af5-d069-4f49-8204-20fc5ed9baa3',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
    },
  ];

  async findOneByEmailAsync(email: string): Promise<UserDto> {
    return this.users.find((user) => user.email === email);
  }

  async findOneByIdAsync(id: string): Promise<UserDto> {
    return this.users.find((user) => user.id === id);
  }
}
