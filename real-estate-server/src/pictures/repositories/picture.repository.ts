import { EntityRepository, Repository } from 'typeorm';
import { PictureEntity } from '../entities/picture.entity';

@EntityRepository(PictureEntity)
export class PictureRepository extends Repository<PictureEntity> {}
