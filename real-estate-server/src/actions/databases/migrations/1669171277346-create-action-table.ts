import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateActionTable1669171277346 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Action',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
            generationStrategy: 'uuid',
          },
          {
            name: 'actionName',
            type: 'varchar',
            length: '250',
          },
          {
            name: 'active',
            type: 'int',
            default: 1,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
            isNullable: true,
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            default: 'null',
            isNullable: true,
          },
        ],
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
