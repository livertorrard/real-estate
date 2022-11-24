import { Controller, Get } from '@nestjs/common';
import { CategoryService } from 'src/categories/services/category.service';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getCategories() {
    return this.categoryService.getCategories();
  }
}
