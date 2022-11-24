import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createPictureTable1669177207130 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Picture',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
            generationStrategy: 'uuid',
          },
          {
            name: 'pictureName',
            type: 'varchar',
            isUnique: true,
            length: '250',
          },
          { name: 'categoryId', type: 'uuid', isNullable: true },
          { name: 'productId', type: 'uuid', isNullable: true },
          { name: 'postId', type: 'uuid', isNullable: true },
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
            default: 'now()',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['categoryId'],
            referencedTableName: 'Category',
            referencedColumnNames: ['id'],
          },
          {
            columnNames: ['productId'],
            referencedTableName: 'Product',
            referencedColumnNames: ['id'],
          },
          {
            columnNames: ['postId'],
            referencedTableName: 'Post',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
