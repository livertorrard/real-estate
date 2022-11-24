import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(private categoryRepo: CategoryRepository) {}

  getCategories(): Promise<CategoryEntity[]> {
    return this.categoryRepo.find();
  }
}
