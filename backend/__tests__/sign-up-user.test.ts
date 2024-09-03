import 'reflect-metadata';

import { randomUUID } from 'crypto';
import { container } from 'tsyringe';

import SignUpUser from '../src/core/use-cases/sign-up.use-case';
import { IUserRepository } from '../src/core/ports/database.port';

import {
  ExistingUser,
  NotExistingUser,
} from '../src/core/entities/user.entity';

describe('SignUpUser', () => {
  const notExistingUser = new NotExistingUser();

  // mock repository
  const mock__create = jest.fn();
  const mock__UserRepository = () => {
    return {
      create: mock__create,
    };
  };

  container.register<Partial<IUserRepository>>('UserRepository', {
    useValue: mock__UserRepository(),
  });

  it('should return an access token', async () => {
    mock__create.mockResolvedValue(new ExistingUser({ id: randomUUID() }));
    const body = {
      name: 'my name',
      email: 'myemail@mail.com',
      password: 'mypassword',
    };
    const response = await new SignUpUser().execute(body);

    expect(response).toHaveProperty('accessToken');
    expect(
      container.resolve<IUserRepository>('UserRepository').create,
    ).toHaveBeenCalledWith({
      name: body.name,
      email: body.email,
      password: notExistingUser.hashPassword(body.password),
    });
    const accessToken = (response as unknown as { accessToken: string })
      .accessToken;
    expect(accessToken).not.toEqual(0);
    const payloadInToken =
      notExistingUser.verifyAndDecodeUserAccessToken(accessToken);
    expect(payloadInToken).toHaveProperty('id');
    expect(payloadInToken.id).not.toEqual(0);
  });

  it('should return already exist if provider returns this error', async () => {
    mock__create.mockResolvedValue('USER_ALREADY_EXISTS');
    const body = {
      name: 'name',
      email: 'email-already-exists',
      password: 'password',
    };

    const response = await new SignUpUser().execute(body);

    expect(response).toStrictEqual('USER_ALREADY_EXISTS');
  });
});
