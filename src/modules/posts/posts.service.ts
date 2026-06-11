import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UsersService } from '../users/users.service';
import { PostsRepository } from './posts.repository';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsRepository: PostsRepository,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<PostDto> {
    await this.usersService.findOne(createPostDto.userId);

    return await this.postsRepository.create(createPostDto);
  }

  async findAll(): Promise<PostDto[]> {
    return await this.postsRepository.findAll();
  }

  async findOne(id: string): Promise<PostDto> {
    const post = await this.postsRepository.findOne(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async findByUser(userId: string): Promise<PostDto[]> {
    await this.usersService.findOne(userId);

    return await this.postsRepository.findByUser(userId);
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<PostDto> {
    const post = await this.postsRepository.update(id, updatePostDto);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async remove(id: string): Promise<PostDto> {
    await this.findOne(id);

    const post = await this.postsRepository.remove(id);
    if (!post) {
      throw new NotFoundException('Post not found after remove');
    }
    return post;
  }
}
