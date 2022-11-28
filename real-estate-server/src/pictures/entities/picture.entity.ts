import { BaseEntity } from 'src/base.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Picture')
export class PictureEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250 })
  pictureName: string;

  @Column('uuid', { nullable: true })
  categoryId?: string;

  @Column('uuid', { nullable: true })
  productId?: string;

  @Column('uuid', { nullable: true })
  postId?: string;

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;
}
