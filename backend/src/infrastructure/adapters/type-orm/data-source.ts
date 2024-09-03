import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { z } from 'zod';

import migrations from './migrations';
import notTypeSafeConfig from './type-orm.config';

import User from './user/user.entity';
import Post from './post/post.entity';

const ConfigSchema = z.object({
  host: z.string().min(1),
  port: z.coerce.number().min(1).max(65_535),
  user: z.string().min(1),
  password: z.string().min(1),
  database: z.string().min(1),
  dev: z.enum(['true', 'false']),
  debug: z.enum(['true', 'false']),
});

const config = ConfigSchema.parse(notTypeSafeConfig);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.host,
  port: +config.port,
  username: config.user,
  password: config.password,
  database: config.database,
  entities: [User, Post],
  migrations,
  migrationsRun: true,
  synchronize: config.dev === 'true',
  logging: config.debug === 'true',
  namingStrategy: new SnakeNamingStrategy(),
});

AppDataSource.initialize()
  .then(() => console.log('Data Source has been initialized!'))
  .catch(console.error);
