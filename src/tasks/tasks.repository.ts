import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(data: {
    title: string;
    description: string;
    planned_end_date?: Date | null;
    user_id: number;
    category_id: number;
    is_favorite: boolean;
  }): Promise<Task> {
    const task = await this.prisma.tasks.create({
      data,
      select: {
        id: true,
        title: true,
        description: true,
        planned_end_date: true,
        actual_end_date: true,
        create_at: true,
        user_id: true,
        is_favorite: true,
        category_id: true,
        users: {
          select: {
            external_id: true,
          },
        },
      },
    });

    return task;
  }
}
