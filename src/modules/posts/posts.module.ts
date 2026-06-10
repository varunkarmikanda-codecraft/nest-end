import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { UsersModule } from '../users/users.module';
import { DbModule } from '../db/db.module';

@Module({
  imports: [UsersModule, DbModule],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
})
export class PostsModule {}
