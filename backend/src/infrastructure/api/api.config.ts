import { env } from 'node:process';

export default {
  env: env['NODE_ENV'],
  port: env['PORT'],
  FB: {
    pageId: env['FB_PAGE_ID'],
    accessToken: env['FB_ACCESS_TOKEN'],
  },
};
