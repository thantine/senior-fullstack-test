import {
  Body,
  Controller,
  Response,
  Post,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa';
// import { autoInjectable } from 'tsyringe';

import SignupUseCase from '../../../../core/use-cases/sign-up.use-case';
import LoginUseCase from '../../../../core/use-cases/login-in.use-case';

import { createUserCodec, loginUserCodec } from './user.codec';

import {
  LoginInputDto,
  LoginOutputDto,
  SignupInputDto,
  SignupOutputDto,
} from './dto';

import {
  ConflictError,
  InvalidInputError,
  NotFoundError,
} from '../../error-handler';

// @autoInjectable()
@Route('users')
@Tags('Users')
export class UserController extends Controller {
  constructor() {
    super();
  }

  /**
   * @summary login user
   */
  @Post('/login')
  @SuccessResponse(200)
  @Response(400, 'Invalid request params')
  @Response(404, 'Not found')
  async login(@Body() requestBody: LoginInputDto): Promise<LoginOutputDto> {
    const decodingResult = loginUserCodec.decode(requestBody);

    if (!decodingResult.success) {
      throw new InvalidInputError(decodingResult.error.toString());
    }

    const user = await new LoginUseCase().execute(
      decodingResult.data.email,
      decodingResult.data.password,
    );

    if (user === 'USER_NOT_FOUND') {
      throw new NotFoundError('User not found');
    }

    return {
      user: {
        email: decodingResult.data.email,
      },
      accessToken: user.accessToken,
    };
  }

  /**
   * @summary Signup user
   */
  @Post('/signup')
  @SuccessResponse(201)
  @Response(400, 'Invalid request params')
  @Response(409, 'Already exists')
  async signup(@Body() requestBody: SignupInputDto): Promise<SignupOutputDto> {
    const decodingResult = createUserCodec.decode(requestBody);

    if (!decodingResult.success) {
      throw new InvalidInputError(decodingResult.error.toString());
    }

    const user = await new SignupUseCase().execute(decodingResult.data);

    if (user === 'USER_ALREADY_EXISTS') {
      throw new ConflictError('User alrady exists');
    }

    if (user === 'CANNOT_CREATE_USER') {
      throw new Error('Cannot create user');
    }

    return {
      user: {
        email: decodingResult.data.email,
      },
      accessToken: user.accessToken,
    };
  }
}
