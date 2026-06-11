import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../db/drizzle.service';
import { CreatePostDto } from './dto/create-post.dto';
import * as schema from '../db/schema';
import { eq } from 'drizzle-orm';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostsRepository {
  constructor(private readonly drizzle: DrizzleService) {}

  async create(createPostDto: CreatePostDto): Promise<PostDto> {
    const [post] = await this.drizzle.db
      .insert(schema.posts)
      .values(createPostDto)
      .returning();

    return post;
  }

  async findAll(): Promise<PostDto[]> {
    const post = await this.drizzle.db.select().from(schema.posts);

    return post;
  }

  async findOne(id: string): Promise<PostDto | null> {
    const [post] = await this.drizzle.db
      .select()
      .from(schema.posts)
      .where(eq(schema.posts.id, id))
      .limit(1);

    return post ?? null;
  }

  async findByUser(userId: string): Promise<PostDto[]> {
    const post = await this.drizzle.db
      .select()
      .from(schema.posts)
      .where(eq(schema.posts.userId, userId));

    return post;
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<PostDto | null> {
    const [post] = await this.drizzle.db
      .update(schema.posts)
      .set(updatePostDto)
      .where(eq(schema.posts.id, id))
      .returning();

    return post ?? null;
  }

  async remove(id: string): Promise<PostDto | null> {
    const [post] = await this.drizzle.db
      .delete(schema.posts)
      .where(eq(schema.posts.id, id))
      .returning();

    return post ?? null;
  }
}
