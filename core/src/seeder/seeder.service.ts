import { UserRoleService } from '@app/user-role/user-role.service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(private readonly userRoleService: UserRoleService) {}

  async seedAllAsync(): Promise<void> {
    await this.seedUserRolesAsync()
      .then((completed) => {
        Promise.resolve(completed);
      })
      .catch((error) => {
        Promise.reject(error);
      });
  }

  async seedUserRolesAsync(): Promise<void> {
    this.logger.log('Seeding User Roles starting...');
    await this.userRoleService.createDefaultRolesAsync();
    this.logger.log('Seeding User Roles Finished.');
  }
}
