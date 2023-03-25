import { Injectable } from '@nestjs/common';
import { first, Many, orderBy, pick } from 'lodash';
import { PictureService } from 'src/pictures/services/picture.service';
import { FindManyOptions, Like, UpdateResult } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { ProductRepository } from '../repositories/product.repository';
import { QueryOptionsProduct } from '../types/query-options-product.type';

@Injectable()
export class ProductService {
  constructor(
    private pictureService: PictureService,
    private productRepo: ProductRepository,
  ) {}

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

  getProductForRent() {
    return this.productRepo.find({
      where: { actionId: 'c466a38c-7d44-46c7-9508-5ac7d30c728e' },
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

  getProductForSales() {
    return this.productRepo.find({
      where: { actionId: 'fff3b141-08f7-4585-bb75-2f72f2aaaf9a' },
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

  async getProductsBySearch(keyWord: string) {
    const products = await this.productRepo.find({
      relations: ['category', 'author', 'action', 'pictures'],
      where: [
        { name: Like(`%${keyWord}%`) },
        { productCode: Like(`%${keyWord}%`) },
        { category: { name: Like(`%${keyWord}%`) } },
        { author: { name: Like(`%${keyWord}%`) } },
        { author: { name: Like(`%${keyWord}%`) } },
      ],
    });

    return products.map((product) => {
      return {
        ...pick(product, ['id', 'name', 'productCode', 'price']),
        pictureName: first(product?.pictures)?.pictureName,
        actionName: product.action.actionName,
        ...product,
      };
    });
  }

  find(options: FindManyOptions<ProductEntity>): Promise<ProductEntity[]> {
    return this.productRepo.find(options);
  }

  async createProduct(file, rawData, productId?: string) {
    const data = JSON.parse(rawData);
    let numberActive: number;

    if (data.active) {
      numberActive = 1;
    } else {
      numberActive = 0;
    }

    const product = await this.productRepo.save({
      id: productId,
      active: numberActive,
      productCode: data.sp_masp,
      name: data.sp_ten,
      description: data.sp_mota,
      bedRoom: data.sp_phongngu,
      toilet: data.sp_phongwc,
      area: data.sp_dientich,
      houseDirection: data.sp_huongnha,
      address: data.sp_diachi,
      price: data.sp_gia,
      categoryId: data.sp_iddm,
      authorId: data.sp_idtg,
      actionId: data.sp_idtl,
    });

    if (file) {
      await this.pictureService.createPicture({
        pictureName: file.originalname,
        productId: product.id,
      });
    }

    return product;
  }

  deleteProducts(ids: string[]): Promise<UpdateResult> {
    return this.productRepo.softDelete(ids);
  }
}
