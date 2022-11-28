import { Injectable } from '@nestjs/common';
import { Many, orderBy } from 'lodash';
import { ProductRepository } from '../repositories/product.repository';
import { QueryOptionsProduct } from '../types/query-options-product.type';

@Injectable()
export class ProductService {
  constructor(private productRepo: ProductRepository) {}

  async getProductsByOptions(options: QueryOptionsProduct) {
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
}
