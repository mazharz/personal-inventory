import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Response } from 'express';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(
    @Res() res: Response,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    if (!createCategoryDto || Object.keys(createCategoryDto).length === 0) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        message: 'Make sure you provide a payload.',
      });
    }
    if (!createCategoryDto.name || !createCategoryDto.name.length) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        message: 'Make sure you provide a valid category name.',
      });
    }
    if (
      createCategoryDto.parent_id === undefined ||
      Number.isNaN(Number(createCategoryDto.parent_id))
    ) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        message: 'Make sure you provide a valid category parent_id.',
      });
    }

    const result = await this.categoryService.create(createCategoryDto);
    res.status(HttpStatus.OK).send(result);
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const result = await this.categoryService.findAll();
      res.status(HttpStatus.OK).send(result);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: String(error),
      });
    }
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    if (!id || Number.isNaN(Number(id))) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        message: 'You must provide a valid id.',
      });
    }

    const result = await this.categoryService.findOne(Number(id));
    res.status(HttpStatus.OK).send(result);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
