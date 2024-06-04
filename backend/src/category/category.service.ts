import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Result } from '../type/utils';
import { Category } from './entities/category.entity';
import { DatabaseService } from '../service/db/db.service';

@Injectable()
export class CategoryService {
  constructor(private readonly database: DatabaseService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Result> {
    try {
      await this.database.query<any>(
        'INSERT INTO category (name, parent_id) VALUES ($1, $2)',
        [createCategoryDto.name, createCategoryDto.parent_id],
      );

      return { success: true };
    } catch (error) {
      // foreign key constraint error
      if (error.code === '23503') {
        return {
          success: false,
          message: `You are referencing a non-existent database object: "${error.constraint}"`,
        };
      }
      // not null constraint error
      if (error.code === '23502') {
        return {
          success: false,
          message: `Column "${error.column}" cannot be null.`,
        };
      }
      throw error;
    }
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

  async findOne(id: number): Promise<Result<Category>> {
    try {
      const result = await this.database.query<Category>(
        'SELECT * FROM category WHERE id = $1',
        [id],
      );

      if (result && result[0]) {
        return {
          success: true,
          data: result[0],
        };
      }

      return {
        success: true,
        data: null,
      };
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
