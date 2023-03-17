import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductEntity } from 'src/products/entities/product.entity';
import { ProductService } from 'src/products/services/product.service';
import { diskStorage } from 'multer';
import path = require('path');

export const storage = {
  storage: diskStorage({
    destination: './public/images',
    filename: (req, file, cb) => {
      const filename: string = path
        .parse(file.originalname)
        .name.replace(/\s/g, '');
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

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

  @Post('create')
  @UseInterceptors(FileInterceptor('file', storage))
  createProduct(@UploadedFile() file, @Body() data) {
    return this.productService.createProduct(file, data.data);
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

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};
