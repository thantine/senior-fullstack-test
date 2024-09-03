import { z } from 'zod';
import { PostOutputDto } from './post.dto';

export const CreatePostInputDto = z.object({
  content: z.string().min(1),
});

export type CreatePostInputDto = ReturnType<typeof CreatePostInputDto.parse>;

export const CreatePostOutputDto = PostOutputDto;
export type CreatePostOutputDto = ReturnType<typeof CreatePostOutputDto.parse>;
