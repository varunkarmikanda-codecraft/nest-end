import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllQueryDto } from './dto/find-all-query.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'ADMIN',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'DEV',
    },
    {
      id: '3',
      name: 'Alex Lee',
      email: 'alex.lee@example.com',
      role: 'INTERN',
    },
    {
      id: '4',
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      role: 'DEV',
    },
    {
      id: '5',
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      role: 'ADMIN',
    },
    {
      id: '6',
      name: 'Sara Khan',
      email: 'sara.khan@example.com',
      role: 'INTERN',
    },
    {
      id: '7',
      name: 'David Wilson',
      email: 'david.wilson@example.com',
      role: 'DEV',
    },
  ];

  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(query?: FindAllQueryDto) {
    return await this.usersRepository.findAll(query);
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const duplicateUser = await this.usersRepository.findDuplicateUser(
      createUserDto.email,
    );

    if (duplicateUser) {
      throw new ConflictException('User already exists');
    }

    return await this.usersRepository.create(createUserDto);
  }

  async update(id: string, updatedUserDto: UpdateUserDto) {
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
    return await this.usersRepository.update(id, updatedUserDto);
  }

  async delete(id: string) {
    const existingUser = await this.usersRepository.findOne(id);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    return await this.usersRepository.delete(id);
  }
}
