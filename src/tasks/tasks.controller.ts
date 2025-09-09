import { Controller, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { AppResponse } from 'src/common/response/app.response';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    const data = await this.tasksService.create(createTaskDto);
    return new AppResponse({
      statusCode: 201,
      message: 'Tarefa criada com sucesso!',
      result: 'success',
      data,
    });
  }
}
