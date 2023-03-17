import { Injectable } from '@nestjs/common';
import { ActionEntity } from '../entities/action.entity';
import { ActionRepository } from '../repositories/action.repository';

@Injectable()
export class ActionService {
  constructor(private actionRepo: ActionRepository) {}

  getActions(): Promise<ActionEntity[]> {
    return this.actionRepo.find();
  }
}
