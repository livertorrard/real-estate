import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionEntity } from './entities/action.entity';
import { ActionController } from './http/controllers/action.controller';
import { ActionRepository } from './repositories/action.repository';
import { ActionService } from './services/action.service';

@Module({
  controllers: [ActionController],
  providers: [ActionService],
  imports: [TypeOrmModule.forFeature([ActionEntity, ActionRepository])],
})
export class ActionModule {}
