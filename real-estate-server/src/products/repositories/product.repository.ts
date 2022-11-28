import { EntityRepository, Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { QueryOptionsProduct } from '../types/query-options-product.type';

@EntityRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {
  getProductsByOptions(options: QueryOptionsProduct) {
    const { arrayCategoryIds, type } = options;
    const query = this.createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.author', 'author')
      .leftJoinAndSelect('product.pictures', 'pictures');

    if (arrayCategoryIds.length) {
      query.where('product.categoryId IN (:...arrayCategoryIds)', {
        arrayCategoryIds,
      });
    }

    if (type) {
      query.where('product.actionId =:type', {
        type,
      });
    }

    return query.getMany();
  }
}
