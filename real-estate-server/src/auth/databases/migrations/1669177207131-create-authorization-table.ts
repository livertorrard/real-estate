import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAuthorizationTable1669177207131
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Authorization',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
            generationStrategy: 'uuid',
          },
          {
            name: 'typeUser',
            type: 'varchar',
            isUnique: true,
            length: '50',
          },
          {
            name: 'role',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'description',
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
