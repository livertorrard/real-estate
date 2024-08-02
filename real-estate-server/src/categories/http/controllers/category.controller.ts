import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from 'src/categories/services/category.service';
import { UpdateActiveDto } from '../dto/update-active.dto';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/core/core-helper';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { getIds } from 'src/core/decorators/get-ids.decorator';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('pictureName', storage))
  createCategory(
    @UploadedFile() file,
    @Body() dto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.categoryService.createCategory(file, dto);
  }

  @Get()
  getCategories(@Query('search') key: string) {
    return this.categoryService.getCategories(key);
  }

  @Get('representative')
  getRepresentativeCategory() {
    return this.categoryService.getRepresentativeCategory();
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('pictureName', storage))
  async updateCategory(
    @Param('id') id: string,
    @Body() dto: CreateCategoryDto,
    @UploadedFile() file,
  ) {
    await this.categoryService.updateCategory(id, dto, file);
  }

  @Put('active/:id')
  updateActive(@Param('id') id: string, @Body() dto: UpdateActiveDto) {
    return this.categoryService.update(id, dto);
  }

  @Delete()
  async deleteManyByIds(@getIds('ids') ids: string[]): Promise<void> {
    await this.categoryService.deleteManyByIds(ids);
  }
}
