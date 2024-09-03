import { env } from 'node:process';

export default {
  host: env['DATABASE_HOST'],
  port: env['DATABASE_PORT'],
  user: env['DATABASE_USER'],
  password: env['DATABASE_PASSWORD'],
  database: env['DATABASE_DB'],
  dev: env['DATABASE_DEV'],
  debug: env['DATABASE_DEBUG'],
};
