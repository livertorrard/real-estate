import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { env } from './env.config';

export const config: TypeOrmModuleOptions = {
  type: env.DATABASE.CONNECT,
  host: env.DATABASE.HOST,
  port: env.DATABASE.PORT,
  username: env.DATABASE.USER,
  password: env.DATABASE.PASSWORD,
  database: env.DATABASE.NAME,
  synchronize: false,
  logging: false,
  migrationsRun: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/**/**/databases/migrations/**/*.js'],
  subscribers: ['dist/database/subscriber/**/*.js'],
  autoLoadEntities: true,
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'databases/migrations',
    subscribersDir: 'database/subscriber',
  },
};
