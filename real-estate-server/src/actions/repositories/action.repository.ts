import { EntityRepository, Repository } from 'typeorm';
import { ActionEntity } from '../entities/action.entity';

@EntityRepository(ActionEntity)
export class ActionRepository extends Repository<ActionEntity> {}
