import { z } from 'zod';

export const PostToFacebookInputDto = z.object({
  id: z.string().min(1),
});

export const PostToFacebookOutputDto = z.object({
  id: z.string(),
  fbPostId: z.string(),
  like: z.number(),
  share: z.number(),
});

export type PostToFacebookInputDto = ReturnType<
  typeof PostToFacebookInputDto.parse
>;

export type PostToFacebookOutputDto = ReturnType<
  typeof PostToFacebookOutputDto.parse
>;
