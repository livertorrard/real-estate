import { BaseEntity } from 'src/base.entity';
import { PictureEntity } from 'src/pictures/entities/picture.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Post')
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250 })
  name: string;

  @Column({ type: 'varchar', length: 10485760 })
  description: string;

  @Column({ type: 'boolean', default: false })
  active: boolean;

  @Column({ type: 'varchar', length: 20 })
  code: string;

  @OneToMany(() => PictureEntity, (picture) => picture.post)
  pictures: PictureEntity[];
}
