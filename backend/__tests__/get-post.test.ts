import 'reflect-metadata';

import { randomUUID } from 'crypto';
import { container } from 'tsyringe';

import GetPost from '../src/core/use-cases/get-post.use-case';
import { IPostRepository } from '../src/core/ports/database.port';

import { Post } from '../src/core/entities';

describe('GetPost', () => {
  const id: string = randomUUID();
  const mock__data: Partial<Post> = {
    id,
    content: 'content',
  };

  // mock repository
  const mock__findById = jest.fn();
  const mock__PostRepository = () => {
    return {
      findById: mock__findById,
    };
  };

  container.register<Partial<IPostRepository>>('PostRepository', {
    useValue: mock__PostRepository(),
  });

  it('should return the post with id', async () => {
    mock__findById.mockResolvedValue(mock__data);

    const response = await new GetPost().execute(id);

    expect(response).toStrictEqual(mock__data);
    expect(
      container.resolve<IPostRepository>('PostRepository').findById,
    ).toHaveBeenCalledWith(id);
  });

  it('should return not found with wrong id', async () => {
    mock__findById.mockResolvedValue(null);

    const response = await new GetPost().execute(id);

    expect(response).toStrictEqual('POST_NOT_FOUND');
  });
});
