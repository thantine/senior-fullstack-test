import { container } from 'tsyringe';

import { IPostRepository } from '../ports/database.port';

import { Post } from '../entities';

class FindAllPosts {
  private postRepository: IPostRepository;

  constructor() {
    this.postRepository = container.resolve<IPostRepository>('PostRepository');
  }

  async execute(): Promise<Post[]> {
    return this.postRepository.findAll();
  }
}

export default FindAllPosts;
