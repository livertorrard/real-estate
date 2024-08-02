import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePostTable1669176564095 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Post',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '250',
          },
          {
            name: 'description',
            type: 'varchar',
            length: '1000000',
          },
          {
            name: 'active',
            type: 'boolean',
            default: false,
          },
          {
            name: 'code',
            type: 'varchar',
            length: '20',
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
