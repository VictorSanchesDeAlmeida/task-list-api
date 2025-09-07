import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AppResponse } from 'src/common/response/app.response';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const data = await this.usersService.create(createUserDto);
    return data;
  }

  @Get()
  async findAll() {
    const data = await this.usersService.findAll();
    return new AppResponse({
      message: 'Users retrieved successfully',
      statusCode: 200,
      result: 'success',
      data,
    });
  }
}
