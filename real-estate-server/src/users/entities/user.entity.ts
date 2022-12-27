import { AuthEntity } from 'src/auth/entities/auth.entity';
import { BaseEntity } from 'src/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GenderTypeEnum } from '../enums/gender.enum';
@Entity('User')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  fullname: string;

  @Column({ type: 'varchar', length: 250 })
  credential: string;

  @Column({ type: 'varchar', length: 11 })
  phone: string;

  @Column({ type: 'varchar', default: 1 })
  gender: GenderTypeEnum;

  @Column({ type: 'timestamp' })
  birthday: Date;

  @Column({ type: 'boolean', default: true })
  verify: boolean;

  @Column({ type: 'int', default: 1 })
  active: number;

  @Column({ type: 'uuid' })
  authorizationId: string;

  @Column({ type: 'varchar', length: 50 })
  password: string;

  @ManyToOne(() => AuthEntity)
  @JoinColumn({ name: 'authorizationId' })
  auth: AuthEntity;
}
