import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags,
  Request,
  Put,
} from 'tsoa';
import cron from 'node-cron';

import GetPostUseCase from '../../../../core/use-cases/get-post.use-case';
import FindAllPostsUseCase from '../../../../core/use-cases/find-all-posts.use-case';
import CreatePostUseCase from '../../../../core/use-cases/create-post.use-case';
import PostFacebookUseCase from '../../../../core/use-cases/post-facebook.use-case';
import UpdatePostUseCase from '../../../../core/use-cases/update-post.use-case';

import {
  createPostCodec,
  getPostCodec,
  postToFacebookCodec,
} from './post.codec';

import {
  GetPostOutputDto,
  GetPostsOutputDto,
  CreatePostInputDto,
  CreatePostOutputDto,
} from './dto';

import { InvalidInputError, NotFoundError } from '../../error-handler';
import { AuthenticatedRequest } from '../../middlewares/authentication.middleware';
import {
  PostToFacebookInputDto,
  PostToFacebookOutputDto,
} from './dto/post-facebook.dto';
import CountMetricsUseCase from '../../../../core/use-cases/count-metrics.use-case';
// import { AuthenticatedRequest } from '../../middlewares/authentication.middleware';

// @autoInjectable()
@Route('posts')
@Tags('Posts')
@Security('jwt')
export class PostController extends Controller {
  constructor() {
    super();
  }

  /**
   * @summary Get all posts
   */
  @Get()
  @SuccessResponse(200)
  async findAll(): Promise<GetPostsOutputDto> {
    return await new FindAllPostsUseCase().execute();
  }

  /**
   * @summary Get a post by id
   * @param id The post's identifier
   */
  @Get('{id}')
  @SuccessResponse(200)
  @Response(400, 'Invalid post id format')
  @Response(404, 'Not found')
  async getById(@Path() id: string): Promise<GetPostOutputDto> {
    const postId = getPostCodec.decode(id);

    if (!postId.success) {
      throw new InvalidInputError('Invalid post id format');
    }

    const post = await new GetPostUseCase().execute(postId.data);

    if (post === 'POST_NOT_FOUND') {
      throw new NotFoundError('Post not found');
    }

    return post;
  }

  /**
   * @summary Create post
   */
  @Post()
  @SuccessResponse(201)
  @Response(400, 'Invalid request params')
  async create(
    @Body() requestBody: CreatePostInputDto,
  ): Promise<CreatePostOutputDto> {
    const decodingResult = createPostCodec.decode(requestBody);

    if (!decodingResult.success) {
      throw new InvalidInputError(decodingResult.error.toString());
    }

    const post = await new CreatePostUseCase().execute(decodingResult.data);

    if (post === 'CANNOT_CREATE_POST') {
      throw new Error('Cannot create post');
    }

    return post;
  }

  /**
   * @summary Post to fabcebook
   */
  @Put('/facebook')
  @SuccessResponse(201)
  @Response(400, 'Invalid request params')
  async postFacebook(
    @Body() requestBody: PostToFacebookInputDto,
  ): Promise<PostToFacebookOutputDto> {
    const decodingResult = postToFacebookCodec.decode(requestBody);

    if (!decodingResult.success) {
      throw new InvalidInputError(decodingResult.error.toString());
    }

    const id = decodingResult.data.id;
    const post = await new GetPostUseCase().execute(id);

    if (post === 'POST_NOT_FOUND') {
      throw new NotFoundError('Post not found');
    }

    const fbPostId = await new PostFacebookUseCase().execute(post.content);

    if (fbPostId === 'CANNOT_POST_TO_FACEBOOK') {
      throw new Error('Cannot post to facebook');
    }

    const updatedPost = await new UpdatePostUseCase().execute({
      id,
      fbPostId,
      like: 0,
      share: 0,
    });

    if (updatedPost === 'CANNOT_UPDATE_POST') {
      throw new Error('Cannot update post in DB');
    }

    return updatedPost;
  }

  /**
   * @summary cronjob to count metrics
   */
  @Post('/count-metrics')
  @SuccessResponse(201)
  @Response(400, 'Invalid request params')
  async countMetrics(): Promise<{ success: boolean }> {
    cron.schedule('*/2 * * * *', async () => {
      const posts = await new FindAllPostsUseCase().execute();

      if (posts.length) {
        posts.forEach(async (post) => {
          const result = await new CountMetricsUseCase().execute(post.fbPostId);

          if (result !== 'CANNOT_COUNT_METRICS') {
            new UpdatePostUseCase().execute({
              id: post.id,
              like: result.like,
              share: result.share,
            });
          }
        });
      }
    });

    // TODO: Should create table to manage cronjob id
    return { success: true };
  }
}
