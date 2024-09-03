import { PostIdDto, CreatePostInputDto } from './dto';
import { PostToFacebookInputDto } from './dto/post-facebook.dto';

export const getPostCodec = {
  decode: (params: unknown) => PostIdDto.safeParse(params),
};

export const createPostCodec = {
  decode: (params: unknown) => CreatePostInputDto.safeParse(params),
};

export const postToFacebookCodec = {
  decode: (params: unknown) => PostToFacebookInputDto.safeParse(params),
};
