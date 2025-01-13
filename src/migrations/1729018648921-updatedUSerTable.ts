import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatedUSerTable1729018648921 implements MigrationInterface {
  name = 'UpdatedUSerTable1729018648921';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "last_login" TO "last_login_at"`);
    await queryRunner.query(
      `CREATE TABLE "sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL, "token" character varying NOT NULL, "expires_at" character varying NOT NULL, "is_revoked" character varying NOT NULL DEFAULT false, CONSTRAINT "UQ_085d540d9f418cfbdc7bd55bb19" UNIQUE ("user_id"), CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19"`,
    );
    await queryRunner.query(`DROP TABLE "sessions"`);
    await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "last_login_at" TO "last_login"`);
  }
}
