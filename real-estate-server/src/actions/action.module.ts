import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionEntity } from './entities/action.entity';
import { ActionRepository } from './repositories/action.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ActionEntity, ActionRepository])],
})
export class ActionModule {}
