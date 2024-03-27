import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserTable1701767500306 implements MigrationInterface {
  name = 'UpdateUserTable1701767500306';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isActive"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "username" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "phone" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "isActive" boolean NOT NULL DEFAULT true`,
    );
  }
}
