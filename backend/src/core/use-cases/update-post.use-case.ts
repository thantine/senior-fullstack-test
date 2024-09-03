import { container } from 'tsyringe';

import { UpdatePostInput, IPostRepository } from '../ports/database.port';

import { Post } from '../entities';

class UpdatePost {
  private postRepository: IPostRepository;

  constructor() {
    this.postRepository = container.resolve<IPostRepository>('PostRepository');
  }

  async execute(args: UpdatePostInput): Promise<Post | 'CANNOT_UPDATE_POST'> {
    return this.postRepository.update(args);
  }
}

export default UpdatePost;
