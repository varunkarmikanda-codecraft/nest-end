import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  /**
   * GET /users
   * GET /users/:id
   * POST /users
   * PATCH /users/:id
   * DELETE /users/:id
   */

  // GET /users
  @Get()
  findAll(@Query('role') role?: 'ADMIN' | 'DEV' | 'INTERN') {
    return this.userService.findAll(role);
  }

  // GET /users/devs
  @Get('devs')
  findDevs() {
    return this.userService.findAll('DEV');
  }

  // GET /users/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  // POST /users
  @Post()
  create(
    @Body()
    createUser: {
      name: string;
      email: string;
      role: 'ADMIN' | 'DEV' | 'INTERN';
    },
  ) {
    return this.userService.create(createUser);
  }

  // POST /users/alt
  @Post('alt')
  createAlt(@Body('id') id: string, @Body('name') name: string) {
    return {
      id,
      name,
    };
  }

  // PATCH /users/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUser: {}) {
    return this.userService.update(id, updateUser);
  }

  // DELETE /users/:id
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
