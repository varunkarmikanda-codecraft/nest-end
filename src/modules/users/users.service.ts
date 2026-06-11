import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllQueryDto } from './dto/find-all-query.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(query?: FindAllQueryDto): Promise<UserDto[]> {
    return await this.usersRepository.findAll(query);
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const duplicateUser = await this.usersRepository.findDuplicateUser(
      createUserDto.email,
    );

    if (duplicateUser) {
      throw new ConflictException('User already exists');
    }

    return await this.usersRepository.create(createUserDto);
  }

  async update(id: string, updatedUserDto: UpdateUserDto): Promise<UserDto> {
    const existingUser = await this.usersRepository.findOne(id);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    const conflictingUser = await this.usersRepository.findDuplicateUser(
      updatedUserDto.email ?? existingUser.email,
    );
    if (conflictingUser && conflictingUser.id !== id) {
      throw new ConflictException(
        'Another user with the same email already exists',
      );
    }
    const user = await this.usersRepository.update(id, updatedUserDto);
    if (!user) {
      throw new NotFoundException('User not found after update');
    }
    return user;
  }

  async delete(id: string): Promise<UserDto> {
    const existingUser = await this.usersRepository.findOne(id);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const user = await this.usersRepository.delete(id);
    if (!user) {
      throw new NotFoundException('User not found after deletion');
    }
    return user;
  }
}
