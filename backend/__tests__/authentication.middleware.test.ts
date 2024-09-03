import * as express from 'express';
import 'reflect-metadata';
import { container } from 'tsyringe';

import { IUserRepository } from '../src/core/ports/database.port';
import { ExistingUser } from '../src/core/entities/user.entity';

import { expressAuthentication } from '../src/infrastructure/api/middlewares/authentication.middleware';
import { UnauthorizedError } from '../src/infrastructure/api/error-handler';

const mock__existingUser = new ExistingUser({ id: 'id-with-user-associated' });

const mock__findById = jest.fn();
const mockUserRepository = () => {
  return {
    findById: mock__findById,
  };
};

const mock__verifyAndDecodeUserAccessToken = jest.fn();
container.register<Partial<IUserRepository>>('UserRepository', {
  useValue: mockUserRepository(),
});

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

describe('Authentication middleware should reject', () => {
  it('rejects because no token provided', async () => {
    const request = { header: () => undefined } as unknown as express.Request;
    await expect(expressAuthentication(request, 'foo', [])).rejects.toEqual(
      new UnauthorizedError('MISSING_AUTHENTICATION'),
    );
  });

  it('rejects because malformed jwt', async () => {
    const request = {
      header: () => 'malformed-jwt',
    } as unknown as express.Request;
    mock__verifyAndDecodeUserAccessToken.mockImplementationOnce(() => {
      throw new Error('Invalid Signature');
    });
    await expect(expressAuthentication(request, 'jwt', [])).rejects.toEqual(
      new UnauthorizedError('INVALID_TOKEN'),
    );
  });

  it('rejects because unknown user', async () => {
    const request = {
      header: () => mock__existingUser.signAndEncodeUserAccessToken(),
    } as unknown as express.Request;
    mock__verifyAndDecodeUserAccessToken.mockReturnValue({
      iamId: 'iam-id-with-no-user-associated',
    });

    await expect(expressAuthentication(request, 'jwt', [])).rejects.toEqual(
      new UnauthorizedError('INVALID_TOKEN'),
    );
  });
});

describe('Authentication middleware should resolve', () => {
  it('resolves user associated to jwt token provided in authorization header', async () => {
    const request = {
      header: () => mock__existingUser.signAndEncodeUserAccessToken(),
    } as unknown as express.Request;

    mock__verifyAndDecodeUserAccessToken.mockReturnValue({
      id: 'id-with-user-associated',
    });
    mock__findById.mockResolvedValue({ id: 'id-with-user-associated' });
    await expect(expressAuthentication(request, 'jwt', [])).resolves.toEqual({
      userId: 'id-with-user-associated',
    });
  });
});
