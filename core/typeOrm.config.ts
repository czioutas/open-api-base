import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config({ path: `.env.${process.env.NODE_ENV}` });
const configService = new ConfigService();

console.log('************');
console.log('TypeOrmConfig running with:');
console.log(process.env.NODE_ENV);
console.log(configService.get('POSTGRES_DB'));
console.log(configService.get('APP_RUNTIME_USER'));
console.log(configService.get('POSTGRES_PORT'));
console.log(configService.get('POSTGRES_HOST'));
console.log('************');

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('APP_RUNTIME_USER'),
  password: configService.get('APP_RUNTIME_USER_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: ['src/**/*.entity{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrations: ['**/src/migrations/*.ts'],
  ssl: configService.get('POSTGRES_SHOULD_USE_SSL'),
  extra: {
    ssl: {
      rejectUnauthorized: configService.get('POSTGRES_REJECT_UNAUTHORIZED'),
    },
  },
});
