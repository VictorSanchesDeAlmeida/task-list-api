import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { SessionModule } from './session/session.module';
@Module({
  imports: [PrismaModule, UsersModule, SessionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
