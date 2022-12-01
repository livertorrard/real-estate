import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductEntity } from 'src/products/entities/product.entity';
import { ProductService } from 'src/products/services/product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getProductsByOptions(
    @Query('categoryIds') categoryIds: string,
    @Query('fromPrice') fromPrice: number,
    @Query('toPrice') toPrice: number,
    @Query('fromSize') fromSize: number,
    @Query('toSize') toSize: number,
    @Query('sort') sort: string,
    @Query('type') type: string,
  ): Promise<ProductEntity[]> {
    return this.productService.getProductsByOptions({
      categoryIds,
      fromPrice,
      toPrice,
      fromSize,
      toSize,
      type,
      sort,
    });
  }

  @Get('search')
  getProductsBySearch(@Query('keyWord') keyWord: string) {
    return this.productService.getProductsBySearch(keyWord);
  }

  @Get('new')
  getProductNew() {
    return this.productService.getProductNew();
  }

  @Get('rents')
  getProductForRent() {
    return this.productService.getProductForRent();
  }

  @Get('sales')
  getProductForSales() {
    return this.productService.getProductForSales();
  }

  @Get(':productId')
  getProductDetail(
    @Param('productId') productId: string,
  ): Promise<ProductEntity> {
    return this.productService.getProductDetail(productId);
  }

  @Get('categories/:categoryId')
  getProductByCategoryId(
    @Param('categoryId') categoryId: string,
  ): Promise<ProductEntity[]> {
    return this.productService.getProductByCategoryId(categoryId);
  }
}
