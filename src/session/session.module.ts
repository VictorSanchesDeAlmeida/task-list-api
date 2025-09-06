import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { UsersRepository } from 'src/users/users.repository';
import { BcryptService } from 'src/common/bcrypt/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'defaultSecretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [SessionController],
  providers: [SessionService, UsersRepository, BcryptService],
})
export class SessionModule {}
