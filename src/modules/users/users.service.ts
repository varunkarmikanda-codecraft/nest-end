import { ConflictException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { RoleEnum } from './enums/role.enum';
import { CreateUserDto } from './dto/create-user.dto';

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

  findAll(role?: RoleEnum) {
    return this.usersRepository.findAll(role)
  }

  findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }

  async create(createUser: CreateUserDto) {
    const duplicateUser = this.usersRepository.findDuplicateUser(createUser.email);

    if(!duplicateUser) throw new ConflictException('User already exists');

    return this.usersRepository.create(createUser);
  }

  update(
    id: string,
    updatedUser: {
      name?: string;
      email?: string;
      role?: 'ADMIN' | 'DEV' | 'INTERN';
    },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: string) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
