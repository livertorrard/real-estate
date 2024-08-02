import { Injectable } from '@nestjs/common';
import { PictureEntity } from '../entities/picture.entity';
import { PictureRepository } from '../repositories/picture.repository';
import { FindConditions, FindManyOptions, UpdateResult } from 'typeorm';

@Injectable()
export class PictureService {
  constructor(private pictureRepo: PictureRepository) {}

  createPicture(data: Partial<PictureEntity>) {
    return this.pictureRepo.save(data);
  }

  find(options?: FindManyOptions<PictureEntity>): Promise<PictureEntity[]> {
    return this.pictureRepo.find(options);
  }

  softDelete(conditions: FindConditions<PictureEntity>): Promise<UpdateResult> {
    return this.pictureRepo.softDelete(conditions);
  }
}
