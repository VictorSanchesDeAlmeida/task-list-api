import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksRepository } from './tasks.repository';
import { UsersRepository } from 'src/users/users.repository';
import AppError from 'src/common/response/app.error';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const user = await this.usersRepository.findById(createTaskDto.user_id);

    if (!user) {
      throw new AppError({
        statusCode: 404,
        message: 'Usuário não encontrado',
        error: 'Not Found',
      });
    }

    const task = await this.tasksRepository.createTask({
      title: createTaskDto.title,
      description: createTaskDto.description,
      planned_end_date: createTaskDto.planned_end_date,
      user_id: user.id,
      category_id: createTaskDto.category_id,
      is_favorite: createTaskDto.is_favorite,
    });

    return {
      id: task.id,
      title: task.title,
      description: task.description,
      planned_end_date: task.planned_end_date,
      actual_end_date: task.actual_end_date,
      create_at: task.create_at,
      user_id: task.users.external_id,
      is_favorite: task.is_favorite,
      category_id: task.category_id,
    };
  }
}
