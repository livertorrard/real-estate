import { BaseEntity } from 'src/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Author')
export class AuthorEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250 })
  name: string;

  @Column({ type: 'int', default: 1 })
  active: number;

  @Column({ type: 'varchar', length: 250 })
  email: string;

  @Column({ type: 'varchar', length: 11 })
  phone: string;
}
