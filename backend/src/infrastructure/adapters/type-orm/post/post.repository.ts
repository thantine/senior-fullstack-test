import { AppDataSource } from '../data-source';
import PostEntity from './post.entity';
import { Post } from '../../../../core/entities';
import {
  CreatePostInput,
  IPostRepository,
  UpdatePostInput,
} from '../../../../core/ports/database.port';

class PostRepository implements IPostRepository {
  async create({
    content,
  }: CreatePostInput): Promise<Post | 'CANNOT_CREATE_POST'> {
    const post = await AppDataSource.getRepository(PostEntity).save({
      content,
    });

    if (!post) {
      return 'CANNOT_CREATE_POST';
    }

    return post;
  }

  async findAll(): Promise<Post[]> {
    const posts = await AppDataSource.getRepository(PostEntity).find();
    return posts.map((post) => {
      return post.toDomainEntity();
    });
  }

  async findById(id: string): Promise<Post | null> {
    const post = await AppDataSource.getRepository(PostEntity).findOne({
      where: { id },
    });

    return post ? post.toDomainEntity() : null;
  }

  async update({
    id,
    like,
    share,
    fbPostId,
  }: UpdatePostInput): Promise<Post | 'CANNOT_UPDATE_POST'> {
    const post = await AppDataSource.getRepository(PostEntity).save({
      id,
      like,
      share,
      fbPostId,
    });

    if (!post) {
      return 'CANNOT_UPDATE_POST';
    }

    return post;
  }
}

export default PostRepository;
