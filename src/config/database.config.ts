// 31. Creating a Config file to store all the db's config

import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Note } from 'src/notes/note.entity';

export const databaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get('DATABASE_HOST') || 'localhost',
  port: configService.get('DATABASE_PORT') || 5432,
  username: configService.get('DATABASE_USERNAME') || 'root',
  password: configService.get('DATABASE_PASSWORD') || 'shinu2301',
  database: configService.get('DATABASE_NAME') || 'nest_demo',
  entities: [User, Note],
  synchronize: true,
  logging: true,
});