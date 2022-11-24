import { BaseEntity } from 'src/base.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;
}
