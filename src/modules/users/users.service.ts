import { Injectable } from '@nestjs/common';

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

  findAll(role?: 'ADMIN' | 'DEV' | 'INTERN') {
    return role ? this.users.filter((user) => user.role === role) : this.users;
  }

  findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }

  create(createUser: {
    name: string;
    email: string;
    role: 'ADMIN' | 'DEV' | 'INTERN';
  }) {
    const highestUserId = [...this.users].sort(
      (a, b) => Number(b.id) - Number(a.id),
    );

    const newUser = {
      id: String(Number(highestUserId[0].id) + 1),
      ...createUser,
    };

    this.users.push(newUser);
    return newUser;
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
