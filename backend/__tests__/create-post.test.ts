import 'reflect-metadata';

import { randomUUID } from 'crypto';
import { container } from 'tsyringe';

import CreatePost from '../src/core/use-cases/create-post.use-case';
import { IPostRepository } from '../src/core/ports/database.port';
import { Post } from '../src/core/entities';

describe('CreatePost', () => {
  const mock__data: Partial<Post> = {
    id: randomUUID(),
    content: 'content',
  };

  // mock repository
  const mock__create = jest.fn();
  const mock__PostRepository = () => {
    return {
      create: mock__create,
    };
  };

  container.register<Partial<IPostRepository>>('PostRepository', {
    useValue: mock__PostRepository(),
  });

  it('should create the post', async () => {
    mock__create.mockResolvedValue(mock__data);
    const body = {
      content: 'content',
    };
    const response = await new CreatePost().execute(body);

    expect(response).toStrictEqual(mock__data);
    expect(
      container.resolve<IPostRepository>('PostRepository').create,
    ).toHaveBeenCalledWith(body);
  });
});
