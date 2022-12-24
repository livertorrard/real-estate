import { BaseEntity } from 'src/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserTypeEnum } from '../enums/user-type.enum';

@Entity('Authorization')
export class AuthEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  typeUser: UserTypeEnum;

  @Column({ type: 'varchar', length: 50 })
  role: string;

  @Column({ type: 'varchar', length: 250 })
  description: string;

  @Column({ type: 'int', default: 1 })
  active: number;
}
