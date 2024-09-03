import { z } from 'zod';
import { UserOutputDto } from './user.dto';

export const LoginInputDto = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

export type LoginInputDto = ReturnType<typeof LoginInputDto.parse>;

export const LoginOutputDto = UserOutputDto;
export type LoginOutputDto = ReturnType<typeof LoginOutputDto.parse>;
