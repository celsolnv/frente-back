import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUser1647383715406 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "cpf",
            type: "varchar(11)",
          },
          {
            name: "bird_date",
            type: "date",
          },
          {
            name: "address_id",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            name: "FKAddress",
            columnNames: ["address_id"],
            referencedTableName: "address",
            referencedColumnNames: ["id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
