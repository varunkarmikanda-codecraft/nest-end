import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
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
    return 
  }

  // GET /users/devs
  @Get('devs')
  findDevs() {
    return [];
  }

  // GET /users/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return { id };
  }

  // POST /users
  @Post()
  create(@Body() createUser: { id: string, name: string, role: string }) {
    return createUser;
  }

  // POST /users/alt
  @Post('alt')
  createAlt(
    @Body('id') id: string,
    @Body('name') name: string,
  ) {
    return {
      id,
      name
    };
  }

  // PATCH /users/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUser: {}) {
    return { id, ...updateUser };
  }

  // DELETE /users/:id
  @Delete(':id')
  delete(@Param('id') id: string) {
    return { id };
  }
}
