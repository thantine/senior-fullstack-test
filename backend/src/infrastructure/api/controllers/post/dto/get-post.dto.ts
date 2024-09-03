import { z } from 'zod';

import { PostOutputDto } from './post.dto';

export const GetPostOutputDto = PostOutputDto;
export type GetPostOutputDto = ReturnType<typeof GetPostOutputDto.parse>;

export const GetPostsOutputDto = z.array(PostOutputDto);
export type GetPostsOutputDto = ReturnType<typeof GetPostsOutputDto.parse>;

export const PostIdDto = z.string().uuid();
