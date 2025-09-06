import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { BcryptService } from 'src/common/bcrypt/bcrypt.service';
import { ResponseUser } from './dto/response-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly bcryptService: BcryptService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseUser> {
    const usernameExists = await this.usersRepository.findByUsername(
      createUserDto.username,
    );

    if (usernameExists) {
      throw new Error('User already exists');
    }

    const emailExists = await this.usersRepository.findByEmail(
      createUserDto.email,
    );

    if (emailExists) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await this.bcryptService.hashPassword(
      createUserDto.password,
    );
    const user = await this.usersRepository.createUser({
      ...createUserDto,
      password: hashedPassword,
    });

    return {
      id: user.external_id,
      email: user.email,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      create_at: user.create_at,
    };
  }

  async findAll(): Promise<ResponseUser[]> {
    const users = await this.usersRepository.findAll();
    return users.map((user) => ({
      id: user.external_id,
      email: user.email,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      create_at: user.create_at,
    }));
  }
}
