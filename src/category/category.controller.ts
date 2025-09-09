import { Controller, Post, Body, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AppResponse } from 'src/common/response/app.response';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const data = await this.categoryService.create(createCategoryDto);

    return new AppResponse({
      statusCode: 201,
      message: 'Categoria criada com sucesso',
      result: 'success',
      data,
    });
  }

  @Get()
  async findAll() {
    const data = await this.categoryService.findAll();

    return new AppResponse({
      statusCode: 200,
      message: 'Categorias recuperadas com sucesso',
      result: 'success',
      data,
    });
  }
}
