import { Injectable } from '@nestjs/common';
import { PictureEntity } from '../entities/picture.entity';
import { PictureRepository } from '../repositories/picture.repository';

@Injectable()
export class PictureService {
  constructor(private pictureRepo: PictureRepository) {}

  createPicture(data: Partial<PictureEntity>) {
    return this.pictureRepo.save(data);
  }
}
