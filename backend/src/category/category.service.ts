import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Result } from '../type/utils';
import { Category } from './entities/category.entity';
import { DatabaseService } from '../service/db/db.service';

@Injectable()
export class CategoryService {
  constructor(private readonly database: DatabaseService) { }

  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  async findAll(): Promise<Result<Category[]>> {
    try {
      const result = await this.database.query<Category[]>(
        'SELECT * FROM category',
      );

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
