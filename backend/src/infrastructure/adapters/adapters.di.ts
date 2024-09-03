import { container } from 'tsyringe';

import {
  IPostRepository,
  IUserRepository,
} from '../../core/ports/database.port';
import UserRepository from './type-orm/user/user.repository';
import PostRepository from './type-orm/post/post.repository';

container
  .register<IPostRepository>('PostRepository', {
    useValue: new PostRepository(),
  })
  .register<IUserRepository>('UserRepository', {
    useValue: new UserRepository(),
  });
