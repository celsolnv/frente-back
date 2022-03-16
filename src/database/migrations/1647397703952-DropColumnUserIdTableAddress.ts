import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class DropColumnUserIdTableAddress1647397703952
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("address", "user_id");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "address",
      new TableColumn({ name: "user_id", type: "uuid" })
    );
  }
}
