import 'reflect-metadata';

import { randomUUID } from 'crypto';
import { container } from 'tsyringe';

import ListPosts from '../src/core/use-cases/find-all-posts.use-case';
import { IPostRepository } from '../src/core/ports/database.port';

import { Post } from '../src/core/entities';

describe('ListBooks', () => {
  const mock__data: Partial<Post>[] = [
    {
      id: randomUUID(),
      content: 'content 1',
    },
    {
      id: randomUUID(),
      content: 'content 2',
    },
  ];

  // mock repository
  const mock__list = jest.fn();
  const mock__PostRepository = () => {
    return {
      findAll: mock__list,
    };
  };

  container.register<Partial<IPostRepository>>('PostRepository', {
    useValue: mock__PostRepository(),
  });

  it('should return the posts list', async () => {
    mock__list.mockResolvedValue(mock__data);

    const response = await new ListPosts().execute();

    expect(response).toStrictEqual(mock__data);
    expect(
      container.resolve<IPostRepository>('PostRepository').findAll,
    ).toHaveBeenCalled();
  });
});
