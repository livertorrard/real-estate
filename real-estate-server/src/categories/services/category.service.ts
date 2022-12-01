import { Injectable } from '@nestjs/common';
import { first, pick } from 'lodash';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(private categoryRepo: CategoryRepository) {}

  async getCategories() {
    const categories = await this.categoryRepo.find({
      relations: ['pictures'],
    });

    return categories.map((category) => {
      return {
        ...pick(category, 'id', 'name'),
        pictureName: category.pictures[1].pictureName,
      };
    });
  }

  async getRepresentativeCategory() {
    const categories = await this.categoryRepo.find({
      relations: ['products', 'pictures'],
    });

    return categories.map((category) => {
      return {
        ...pick(category, 'id', 'name'),
        numberProduct: category.products.length,
        pictureName: first(category.pictures).pictureName,
      };
    });
  }
}
