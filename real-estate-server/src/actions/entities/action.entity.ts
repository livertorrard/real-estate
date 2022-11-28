import { BaseEntity } from 'src/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Action')
export class ActionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250 })
  actionName: string;

  @Column({ type: 'int', default: 1 })
  active: number;
}
