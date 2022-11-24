import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PictureEntity } from './entities/picture.entity';
import { PictureRepository } from './repositories/picture.repository';
import { PictureService } from './services/picture.service';

@Module({
  imports: [TypeOrmModule.forFeature([PictureEntity, PictureRepository])],
  providers: [PictureService],
  exports: [PictureService],
})
export class PictureModule {}
