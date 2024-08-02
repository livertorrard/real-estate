import { Injectable } from '@nestjs/common';
import { flatMap, groupBy, orderBy, pick } from 'lodash';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryRepository } from '../repositories/category.repository';
import { FindConditions, ILike, In } from 'typeorm';
import { CreateCategoryDto } from '../http/dto/create-category.dto';
import { PictureService } from 'src/pictures/services/picture.service';
import { removeImageFromServer } from 'src/core/core-helper';

@Injectable()
export class CategoryService {
  constructor(
    private categoryRepo: CategoryRepository,
    private pictureService: PictureService,
  ) {}

  async getCategories(key: string) {
    const conditions: FindConditions<CategoryEntity> = {};
    if (key) {
      conditions.name = ILike(`%${key}%`);
    }

    const categories = await this.categoryRepo.find({
      relations: ['pictures'],
      where: conditions,
    });

    const grouppedPictures = this.getGroupedPictures(categories);

    const categoriesMapped = categories.map((category) => {
      return {
        ...pick(category, 'id', 'name', 'active'),
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

  async update(id: string, data: Partial<CategoryEntity>): Promise<void> {
    await this.categoryRepo.update(id, data);
  }

  async createCategory(
    file,
    dto: CreateCategoryDto,
    id?: string,
  ): Promise<CategoryEntity> {
    const category = await this.categoryRepo.save({ ...dto, id });
    if (file) {
      await this.pictureService.createPicture({
        categoryId: category.id,
        pictureName: file.filename,
      });
    }

    return category;
  }

  async deleteManyByIds(ids: string[]): Promise<void> {
    await this.removeCategoryPicture(ids);
    await this.categoryRepo.softDelete({ id: In(ids) });
  }

  async updateCategory(
    id: string,
    dto: CreateCategoryDto,
    file,
  ): Promise<void> {
    if (file) {
      await this.removeCategoryPicture([id]);
      await this.createCategory(file, dto, id);
    }

    await this.categoryRepo.update({ id }, dto);
  }

  async removeCategoryPicture(ids: string[]): Promise<void> {
    const categoryPicures = await this.pictureService.find({
      select: ['pictureName'],
      where: { categoryId: In(ids) },
    });

    await this.pictureService.softDelete({ categoryId: In(ids) });
    const categoryPictureNames = categoryPicures.map(
      ({ pictureName }) => pictureName,
    );

    removeImageFromServer(categoryPictureNames);
  }
}
