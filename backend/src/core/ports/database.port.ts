import { Post } from '../entities';
import { ExistingUser } from '../entities/user.entity';

export type CreateBookInput = {
  title: string;
  summary: string;
  author: string;
  totalPages: number;
};

export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

export type CreatePostInput = {
  content: string;
};

export type UpdatePostInput = {
  id: string;
  fbPostId?: string;
  like?: number;
  share?: number;
};

export interface IPostRepository {
  create(args: CreatePostInput): Promise<Post | 'CANNOT_CREATE_POST'>;
  findById(id: string): Promise<Post | null>;
  findAll(): Promise<Post[]>;
  update(args: UpdatePostInput): Promise<Post | 'CANNOT_UPDATE_POST'>;
}

export interface IUserRepository {
  create(
    args: CreateUserInput,
  ): Promise<ExistingUser | 'USER_ALREADY_EXISTS' | 'CANNOT_CREATE_USER'>;
  findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<ExistingUser | null>;
  findById(id: string): Promise<ExistingUser | null>;
}
