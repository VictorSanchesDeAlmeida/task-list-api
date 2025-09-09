import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryRepository } from './category.repository';
import AppError from 'src/common/response/app.error';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const existingCategory = await this.categoryRepository.findByName(
      createCategoryDto.name,
    );

    if (existingCategory) {
      throw new AppError({
        statusCode: 400,
        message: 'Categoria já existe',
        error: 'Bad Request',
      });
    }

    const category = await this.categoryRepository.create(createCategoryDto);

    return category;
  }

  async findAll() {
    const categories = await this.categoryRepository.findAll();
    return categories;
  }
}
