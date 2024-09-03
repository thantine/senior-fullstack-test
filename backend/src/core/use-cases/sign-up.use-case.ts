import { container } from 'tsyringe';

import { IUserRepository } from '../ports/database.port';

import { NotExistingUser } from '../entities/user.entity';

type SignUpUserInput = {
  name: string;
  email: string;
  password: string;
};

class SignUpUser {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = container.resolve<IUserRepository>('UserRepository');
  }

  async execute({
    name,
    email,
    password,
  }: SignUpUserInput): Promise<
    { accessToken: string } | 'CANNOT_CREATE_USER' | 'USER_ALREADY_EXISTS'
  > {
    const notExistingUser = new NotExistingUser();
    const existingUser = await this.userRepository.create({
      name,
      email,
      password: notExistingUser.hashPassword(password),
    });

    if (
      existingUser === 'USER_ALREADY_EXISTS' ||
      existingUser === 'CANNOT_CREATE_USER'
    ) {
      return existingUser;
    }

    return {
      accessToken: existingUser.signAndEncodeUserAccessToken(),
    };
  }
}

export default SignUpUser;
