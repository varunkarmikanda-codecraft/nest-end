import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HostParam,
  Ip,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllQueryDto } from './dto/find-all-query.dto';
import { UserDto } from './dto/user.dto';

@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * GET /users
   * GET /users/:id
   * POST /users
   * PATCH /users/:id
   * DELETE /users/:id
   */

  // GET /users
  @Get()
  async findAll(@Query() query?: FindAllQueryDto): Promise<UserDto[]> {
    return await this.usersService.findAll(query);
  }

  // GET /users/devs
  @Get('devs')
  async findDevs(): Promise<UserDto[]> {
    return await this.usersService.findAll({ role: 'developer' });
  }

  // DELETE /users/meta
  @Get('meta')
  metadata(
    @Ip() ip: string,
    @HostParam('account') account: string,
    // @Session() session: Record<string, any>,
    @Headers() header: Record<string, string>,
    @Req() request: Request,
  ) {
    return {
      ip: ip,
      account: account,
      header: header,
      request: {
        method: request.method,
        url: request.url,
        body: request.body,
        // query: request.query,
        // param: request.param,
        mode: request.mode,
      },
    };
  }

  @Get('wild/*wildcard')
  wildcard(@Param('wildcard') wild: string | string[]) {
    const wildStr = Array.isArray(wild) ? wild.join('/') : wild;

    const parts = wildStr.split('/');

    return {
      raw: wildStr,
      parts,
      aspath: parts.join('/'),
    };
  }

  // GET /users/:id
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserDto> {
    return await this.usersService.findOne(id);
  }

  // POST /users
  @Post()
  async create(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<UserDto> {
    return await this.usersService.create(createUserDto);
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
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return await this.usersService.update(id, updateUserDto);
  }

  // DELETE /users/:id
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<UserDto> {
    return await this.usersService.delete(id);
  }
}
