import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { SessionModule } from './session/session.module';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './common/guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    SessionModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
