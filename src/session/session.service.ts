import { Injectable } from '@nestjs/common';
import { CredentialsDto } from './dto/credentials.dto';
import { UsersRepository } from 'src/users/users.repository';
import { BcryptService } from 'src/common/bcrypt/bcrypt.service';
import AppError from 'src/common/response/app.error';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class SessionService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly bcryptService: BcryptService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(credentials: CredentialsDto): Promise<{ accessToken: string }> {
    const user = await this.usersRepository.findByUsername(
      credentials.username,
    );

    if (!user) {
      throw new AppError({
        statusCode: 401,
        message: 'Credenciais inválidas',
        error: 'Unauthorized',
      });
    }

    const passwordValid = await this.bcryptService.comparePasswords(
      credentials.password,
      user.password,
    );

    if (!passwordValid) {
      throw new AppError({
        statusCode: 401,
        message: 'Credenciais inválidas',
        error: 'Unauthorized',
      });
    }

    const secret = this.configService.get<string>('JWT_SECRET');

    if (!secret) {
      throw new AppError({
        statusCode: 500,
        message: 'Erro ao gerar token',
        error: 'Internal Server Error',
      });
    }

    const payload = {
      username: user.username,
      id: user.external_id,
      email: user.email,
      first_name: user.first_name,
    };

    const accessToken = jwt.sign(payload, secret, { expiresIn: '1d' });

    return { accessToken };
  }

  async me(external_id: string): Promise<UserDto> {
    const user = await this.usersRepository.findById(external_id);

    if (!user) {
      throw new AppError({
        statusCode: 404,
        message: 'Usuário não encontrado',
        error: 'Not Found',
      });
    }

    return {
      id: user.external_id,
      email: user.email,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      create_at: user.create_at,
    };
  }
}
