import { container } from 'tsyringe';

import { IPostRepository } from '../ports/database.port';
import { Post } from '../entities';

class GetPost {
  private postRepository: IPostRepository;

  constructor() {
    this.postRepository = container.resolve<IPostRepository>('PostRepository');
  }

  async execute(id: string): Promise<Post | 'POST_NOT_FOUND'> {
    const data = await this.postRepository.findById(id);

    return data ?? 'POST_NOT_FOUND';
  }
}

export default GetPost;
