import { LoginInputDto, SignupInputDto } from './dto';

export const loginUserCodec = {
  decode: (params: unknown) => LoginInputDto.safeParse(params),
};

export const createUserCodec = {
  decode: (params: unknown) => SignupInputDto.safeParse(params),
};
