import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1669177207131 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'User',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
            generationStrategy: 'uuid',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            length: '50',
          },
          {
            name: 'fullName',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'credential',
            type: 'varchar',
            length: '250',
          },
          {
            name: 'phone',
            type: 'varchar',
            isUnique: true,
            length: '11',
          },
          {
            name: 'gender',
            type: 'varchar',
            length: '250',
          },
          {
            name: 'birthday',
            type: 'timestamp',
            default: 'now()',
            isNullable: true,
          },
          {
            name: 'verify',
            type: 'boolean',
            default: true,
          },
          {
            name: 'active',
            type: 'int',
            default: 1,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '100',
          },
          { name: 'authorizationId', type: 'uuid', isNullable: false },
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
        foreignKeys: [
          {
            columnNames: ['authorizationId'],
            referencedTableName: 'Authorization',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
