import { container } from 'tsyringe';

import { IUserRepository } from '../ports/database.port';
import { NotExistingUser } from '../entities/user.entity';

class LoginUser {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = container.resolve<IUserRepository>('UserRepository');
  }

  async execute(
    email: string,
    password: string,
  ): Promise<{ accessToken: string } | 'USER_NOT_FOUND'> {
    const notExistingUser = new NotExistingUser();
    const user = await this.userRepository.findByEmailAndPassword(
      email,
      notExistingUser.hashPassword(password),
    );
    return user
      ? { accessToken: user.signAndEncodeUserAccessToken() }
      : 'USER_NOT_FOUND';
  }
}

export default LoginUser;
