import { Injectable } from '@nestjs/common';
import { Many, orderBy } from 'lodash';
import { ProductEntity } from '../entities/product.entity';
import { ProductRepository } from '../repositories/product.repository';
import { QueryOptionsProduct } from '../types/query-options-product.type';

@Injectable()
export class ProductService {
  constructor(private productRepo: ProductRepository) {}

  async getProductsByOptions(
    options: QueryOptionsProduct,
  ): Promise<ProductEntity[]> {
    const { fromPrice, toPrice, fromSize, toSize, sort } = options;
    let arrayCategoryIds: string[] = [];
    if (options.categoryIds) {
      arrayCategoryIds = options.categoryIds.split(',');
    }

    let products = await this.productRepo.getProductsByOptions({
      arrayCategoryIds,
      ...options,
    });

    if (fromPrice) {
      products = products.filter((product) => product.price > fromPrice);
    }

    if (toPrice) {
      products = products.filter((product) => product.price < toPrice);
    }

    if (fromSize) {
      products = products.filter((product) => product.area > fromSize);
    }

    if (fromSize) {
      products = products.filter((product) => product.area < toSize);
    }

    if (sort) {
      products = orderBy(
        products,
        'price',
        `${sort}` as Many<boolean | 'asc' | 'desc'>,
      );
    }

    return products;
  }

  async getProductDetail(productId: string) {
    const product = await this.productRepo.findOneOrFail({
      where: { id: productId },
      join: {
        alias: 'product',
        innerJoinAndSelect: {
          category: 'product.category',
          author: 'product.author',
          pictures: 'product.pictures',
          action: 'product.action',
        },
      },
    });

    return {
      ...product,
      categoryName: product.category.name,
      actionName: product.action.actionName,
      phone: product.author.phone,
      authorName: product.author.name,
      authorEmail: product.author.email,
      pictureName: product.pictures[0].pictureName,
    };
  }

  getProductByCategoryId(categoryId: string): Promise<ProductEntity[]> {
    return this.productRepo.find({
      where: { categoryId },
      join: {
        alias: 'product',
        innerJoinAndSelect: {
          category: 'product.category',
          author: 'product.author',
          pictures: 'product.pictures',
          action: 'product.action',
        },
      },
    });
  }

  async getProductNew() {
    return this.productRepo.find({
      order: { createdAt: 'DESC' },
      join: {
        alias: 'product',
        innerJoinAndSelect: {
          category: 'product.category',
          author: 'product.author',
          pictures: 'product.pictures',
          action: 'product.action',
        },
      },
      take: 10,
    });
  }
}
