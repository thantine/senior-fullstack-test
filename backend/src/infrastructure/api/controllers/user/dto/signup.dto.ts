import { z } from 'zod';
import { UserOutputDto } from './user.dto';

export const SignupInputDto = z.object({
  name: z.string().min(1),
  email: z.string().min(1),
  password: z.string().min(1),
});

export type SignupInputDto = ReturnType<typeof SignupInputDto.parse>;

export const SignupOutputDto = UserOutputDto;
export type SignupOutputDto = ReturnType<typeof SignupOutputDto.parse>;
