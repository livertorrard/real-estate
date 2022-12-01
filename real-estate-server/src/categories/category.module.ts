import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from 'src/products/product.module';
import { CategoryEntity } from './entities/category.entity';
import { CategoryController } from './http/controllers/category.controller';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryService } from './services/category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, CategoryRepository]),
    ProductModule,
  ],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
