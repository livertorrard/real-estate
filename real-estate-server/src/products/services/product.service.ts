import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { QueryOptionsProduct } from '../types/query-options-product.type';

@Injectable()
export class ProductService {
  constructor(private productRepo: ProductRepository) {}

  getProductsByOptions(options: QueryOptionsProduct) {
    const { category, fromPrice, toPrice, fromSize, toSize, type, sort } =
      options;
    console.log('a');
    return this.productRepo.find();
  }
}
