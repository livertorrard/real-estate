import { Controller, Get } from '@nestjs/common';
import { ActionEntity } from 'src/actions/entities/action.entity';
import { ActionService } from 'src/actions/services/action.service';

@Controller('actions')
export class ActionController {
  constructor(private actionService: ActionService) {}

  @Get()
  getActions(): Promise<ActionEntity[]> {
    return this.actionService.getActions();
  }
}
