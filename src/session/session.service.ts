import { Injectable } from '@nestjs/common';
import { CredentialsDto } from './dto/credentials.dto';
import { UsersRepository } from 'src/users/users.repository';
import { BcryptService } from 'src/common/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SessionService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly bcryptService: BcryptService,
    private jwtService: JwtService,
  ) {}

  async signIn(credentials: CredentialsDto): Promise<{ accessToken: string }> {
    const user = await this.usersRepository.findByUsername(
      credentials.username,
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const passwordValid = await this.bcryptService.comparePasswords(
      credentials.password,
      user.password,
    );

    if (!passwordValid) {
      throw new Error('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
