import { Injectable } from '@nestjs/common';
import { flatMap, groupBy, orderBy, pick } from 'lodash';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(private categoryRepo: CategoryRepository) {}

  async getCategories() {
    const categories = await this.categoryRepo.find({
      relations: ['pictures'],
    });
    const grouppedPictures = this.getGroupedPictures(categories);

    const categoriesMapped = categories.map((category) => {
      return {
        ...pick(category, 'id', 'name'),
        pictureName: orderBy(
          grouppedPictures[category.id],
          'createdAt',
          'asc',
        )[0].pictureName,
      };
    });

    return orderBy(categoriesMapped, 'id', 'asc');
  }

  async getRepresentativeCategory() {
    const categories = await this.categoryRepo.find({
      relations: ['products', 'pictures'],
    });
    const grouppedPictures = this.getGroupedPictures(categories);

    return categories.map((category) => {
      return {
        ...pick(category, 'id', 'name'),
        numberProduct: category.products.length,
        pictureName: orderBy(
          grouppedPictures[category.id],
          'createdAt',
          'desc',
        )[0].pictureName,
      };
    });
  }

  getGroupedPictures(categories: CategoryEntity[]) {
    const pictures = flatMap(categories, 'pictures');
    const picturesMapCreatedAt = pictures.map((picture) => {
      return {
        ...picture,
        createdAt: Date.parse(picture.createdAt),
      };
    });

    return groupBy(picturesMapCreatedAt, 'categoryId');
  }
}
