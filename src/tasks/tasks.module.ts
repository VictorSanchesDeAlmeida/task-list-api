import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';
import { UsersRepository } from 'src/users/users.repository';

@Module({
  controllers: [TasksController],
  providers: [TasksService, TasksRepository, UsersRepository],
})
export class TasksModule {}
