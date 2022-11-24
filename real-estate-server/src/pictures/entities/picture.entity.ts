import { BaseEntity } from 'src/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Picture')
export class PictureEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250 })
  pictureName: string;

  @Column({ type: 'int', default: 1 })
  active: number;

  @Column('uuid', { nullable: true })
  categoryId?: string;

  @Column('uuid', { nullable: true })
  productId?: string;

  @Column('uuid', { nullable: true })
  postId?: string;
}
