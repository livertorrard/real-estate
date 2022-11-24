import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './orm.config';
export const DatabaseConfig = TypeOrmModule.forRoot(config);
