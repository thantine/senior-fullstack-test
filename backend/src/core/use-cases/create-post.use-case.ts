import { container } from 'tsyringe';

import { CreatePostInput, IPostRepository } from '../ports/database.port';

import { Post } from '../entities';

class CreatePost {
  private postRepository: IPostRepository;

  constructor() {
    this.postRepository = container.resolve<IPostRepository>('PostRepository');
  }

  async execute({
    content,
  }: CreatePostInput): Promise<Post | 'CANNOT_CREATE_POST'> {
    return this.postRepository.create({ content });
  }
}

export default CreatePost;
