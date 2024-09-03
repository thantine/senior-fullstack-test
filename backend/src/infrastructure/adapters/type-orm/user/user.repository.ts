import { AppDataSource } from '../data-source';

import UserEntity from './user.entity';

import { ExistingUser } from '../../../../core/entities/user.entity';
import {
  CreateUserInput,
  IUserRepository,
} from '../../../../core/ports/database.port';

class UserRepository implements IUserRepository {
  async create({
    name,
    email,
    password,
  }: CreateUserInput): Promise<
    ExistingUser | 'USER_ALREADY_EXISTS' | 'CANNOT_CREATE_USER'
  > {
    const isExists = await AppDataSource.getRepository(UserEntity).exist({
      where: { email },
    });
    if (isExists) {
      return 'USER_ALREADY_EXISTS';
    }

    const userIdentifier = (
      await AppDataSource.getRepository(UserEntity).insert({
        name,
        email,
        password,
      })
    ).identifiers.at(0);

    if (!userIdentifier) {
      return 'CANNOT_CREATE_USER';
    }

    const user = await AppDataSource.getRepository(UserEntity).findOneBy({
      id: userIdentifier.id,
    });

    if (!user) {
      return 'CANNOT_CREATE_USER';
    }

    return user.toDomainEntity();
  }

  async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<ExistingUser | null> {
    const user = await AppDataSource.getRepository(UserEntity).findOne({
      where: { email, password },
    });
    return user ? user.toDomainEntity() : null;
  }

  async findById(id: string): Promise<ExistingUser | null> {
    const user = await AppDataSource.getRepository(UserEntity).findOne({
      where: { id },
    });
    return user ? user.toDomainEntity() : null;
  }
}

export default UserRepository;
