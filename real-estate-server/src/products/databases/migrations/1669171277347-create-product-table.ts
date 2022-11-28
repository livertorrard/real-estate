import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProductTable1669171277347 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Product',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
            generationStrategy: 'uuid',
          },
          {
            name: 'productCode',
            type: 'varchar',
            length: '20',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
            length: '250',
          },
          {
            name: 'description',
            type: 'varchar',
            isUnique: true,
            length: '10000000',
          },
          {
            name: 'active',
            type: 'int',
            default: 1,
          },
          {
            name: 'bedRoom',
            type: 'int',
          },
          {
            name: 'toilet',
            type: 'int',
          },
          {
            name: 'area',
            type: 'int',
          },
          {
            name: 'houseDirection',
            type: 'varchar',
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'price',
            type: 'float',
          },
          { name: 'categoryId', type: 'uuid' },
          { name: 'authorId', type: 'uuid' },
          { name: 'actionId', type: 'uuid' },
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
            columnNames: ['categoryId'],
            referencedTableName: 'Category',
            referencedColumnNames: ['id'],
          },
          {
            columnNames: ['authorId'],
            referencedTableName: 'Author',
            referencedColumnNames: ['id'],
          },
          {
            columnNames: ['actionId'],
            referencedTableName: 'Action',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
