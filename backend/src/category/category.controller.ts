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
import { CategorySchema, CreateCategoryDto } from './dto/create-category.dto';
// import { UpdateCategoryDto } from './dto/update-category.dto';
import { Response } from 'express';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(
    @Res() res: Response,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    const parseResults = CategorySchema.safeParse(createCategoryDto);
    if (!parseResults.success) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        message: parseResults.error.errors[0].message,
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

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCategoryDto: UpdateCategoryDto,
  // ) {
  //   return this.categoryService.update(+id, updateCategoryDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
