import { BaseEntity } from 'src/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Post')
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250 })
  name: string;

  @Column({ type: 'varchar', length: 10485760 })
  description: string;

  @Column({ type: 'int', default: 1 })
  active: number;

  @Column({ type: 'varchar', length: 20 })
  code: string;
}
