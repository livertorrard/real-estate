import { ActionEntity } from 'src/actions/entities/action.entity';
import { AuthorEntity } from 'src/authors/entities/author.entity';
import { BaseEntity } from 'src/base.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { PictureEntity } from 'src/pictures/entities/picture.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Product')
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20 })
  productCode: string;

  @Column({ type: 'varchar', length: 250 })
  name: string;

  @Column({ type: 'varchar', length: 100000 })
  description: string;

  @Column({ type: 'int', default: 1 })
  active: number;

  @Column({ type: 'int' })
  bedRoom: number;

  @Column({ type: 'int' })
  toilet: number;

  @Column({ type: 'int' })
  area: number;

  @Column({ type: 'varchar', length: 100 })
  houseDirection: string;

  @Column({ type: 'varchar', length: 100 })
  address: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'uuid' })
  categoryId: string;

  @Column({ type: 'uuid' })
  authorId: string;

  @Column({ type: 'uuid' })
  actionId: string;

  @OneToMany(() => PictureEntity, (picture) => picture.product)
  pictures: PictureEntity[];

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;

  @ManyToOne(() => AuthorEntity)
  @JoinColumn({ name: 'authorId' })
  author: AuthorEntity;

  @ManyToOne(() => ActionEntity)
  @JoinColumn({ name: 'actionId' })
  action: ActionEntity;
}
