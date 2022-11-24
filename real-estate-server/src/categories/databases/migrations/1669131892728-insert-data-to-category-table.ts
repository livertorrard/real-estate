import { CategoryEntity } from 'src/categories/entities/category.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDataToCategoryTable1669131892728
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(CategoryEntity, [
      { name: 'Căn hộ', ativate: 1 },
      { name: 'Chung cư', ativate: 1 },
      { name: 'Nhà vườn', ativate: 1 },
      { name: 'Biệt thự', ativate: 1 },
      { name: 'Nhà Phố', ativate: 1 },
    ]);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
