import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { SessionModule } from './session/session.module';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './common/guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { CategoryModule } from './category/category.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    SessionModule,
    CategoryModule,
    TasksModule,
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
