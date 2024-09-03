import { z } from 'zod';

export const UserOutputDto = z.object({
  accessToken: z.string(),
  user: z.object({
    email: z.string(),
  }),
});
