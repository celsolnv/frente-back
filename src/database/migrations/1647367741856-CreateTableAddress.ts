import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableAddress1647367741856 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "address",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "cep",
            type: "varchar(9)",
          },
          {
            name: "uf",
            type: "varchar(2)",
          },
          {
            name: "city",
            type: "varchar",
          },
          {
            name: "district",
            type: "varchar",
          },
          {
            name: "street",
            type: "varchar",
          },
          {
            name: "identification_number",
            type: "varchar",
          },
          {
            name: "user_id",
            type: "uuid",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("address");
  }
}
