import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from 'src/products/services/product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getProductsByOptions(
    @Query('category') category: string,
    @Query('fromPrice') fromPrice: number,
    @Query('toPrice') toPrice: number,
    @Query('fromSize') fromSize: number,
    @Query('toSize') toSize: number,
    @Query('sort') sort: string,
    @Query('type') type: string,
  ) {
    return this.productService.getProductsByOptions({
      category,
      fromPrice,
      toPrice,
      fromSize,
      toSize,
      type,
      sort,
    });
  }
}