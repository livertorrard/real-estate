import { Injectable } from '@nestjs/common';
import { PictureEntity } from '../entities/picture.entity';
import { PictureRepository } from '../repositories/picture.repository';

@Injectable()
export class PictureService {
  constructor(private pictureRepo: PictureRepository) {}

  getCategories(): Promise<PictureEntity[]> {
    return this.pictureRepo.find();
  }
}
