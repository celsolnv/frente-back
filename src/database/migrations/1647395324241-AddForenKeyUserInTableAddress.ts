import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddForenKeyUserInTableAddress1647395324241
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "address",
      new TableForeignKey({
        name: "FKUser",
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("address", "FKUser");
  }
}
