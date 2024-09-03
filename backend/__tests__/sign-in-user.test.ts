import 'reflect-metadata';

import { randomUUID } from 'crypto';
import { container } from 'tsyringe';

import SignInUser from '../src/core/use-cases/login-in.use-case';
import { IUserRepository } from '../src/core/ports/database.port';
import {
  ExistingUser,
  NotExistingUser,
} from '../src/core/entities/user.entity';

describe('SignInUser', () => {
  const notExistingUser = new NotExistingUser();

  // mock repository
  const mock__findByEmailAndPassword = jest.fn();
  const mock__UserRepository = () => {
    return {
      findByEmailAndPassword: mock__findByEmailAndPassword,
    };
  };

  container.register<Partial<IUserRepository>>('UserRepository', {
    useValue: mock__UserRepository(),
  });

  it('should return an access token', async () => {
    mock__findByEmailAndPassword.mockResolvedValue(
      new ExistingUser({ id: randomUUID() }),
    );
    const body = {
      email: 'myemail@mail.com',
      password: 'mypassword',
    };
    const response = await new SignInUser().execute(body.email, body.password);

    expect(response).toHaveProperty('accessToken');
    expect(
      container.resolve<IUserRepository>('UserRepository')
        .findByEmailAndPassword,
    ).toHaveBeenCalledWith(
      body.email,
      notExistingUser.hashPassword(body.password),
    );
    const accessToken = (response as unknown as { accessToken: string })
      .accessToken;
    expect(accessToken).not.toEqual(0);
    const payloadInToken =
      notExistingUser.verifyAndDecodeUserAccessToken(accessToken);
    expect(payloadInToken).toHaveProperty('id');
    expect(payloadInToken.id).not.toEqual(0);
  });

  it('should return not found with wrong email / password', async () => {
    mock__findByEmailAndPassword.mockResolvedValue(null);
    const body = {
      email: 'myemail@mail.com',
      password: 'bad password',
    };

    const response = await new SignInUser().execute(body.email, body.password);

    expect(response).toStrictEqual('USER_NOT_FOUND');
  });
});
