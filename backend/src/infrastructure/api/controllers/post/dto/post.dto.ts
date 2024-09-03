import { z } from 'zod';

export const PostOutputDto = z.object({
  id: z.string().uuid(),
  content: z.string().min(1),
});
