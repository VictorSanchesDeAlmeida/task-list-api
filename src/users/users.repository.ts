import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const user = await this.prisma.users.create({
      data,
      select: {
        id: true,
        email: true,
        username: true,
        first_name: true,
        last_name: true,
        external_id: true,
        create_at: true,
        password: true,
      },
    });

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = this.prisma.users.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        first_name: true,
        last_name: true,
        external_id: true,
        create_at: true,
        password: true,
      },
    });

    return users;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.users.findUnique({
      where: { username },
      select: {
        id: true,
        email: true,
        username: true,
        first_name: true,
        last_name: true,
        external_id: true,
        create_at: true,
        password: true,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.users.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        first_name: true,
        last_name: true,
        external_id: true,
        create_at: true,
        password: true,
      },
    });

    return user;
  }
}
