import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PictureModule } from 'src/pictures/picture.module';
import { ProductEntity } from './entities/product.entity';
import { ProductController } from './http/controller/product.controller';
import { ProductRepository } from './repositories/product.repository';
import { ProductService } from './services/product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, ProductRepository]),
    PictureModule,
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
