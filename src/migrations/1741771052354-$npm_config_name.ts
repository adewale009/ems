import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1741771052354 implements MigrationInterface {
  name = ' $npmConfigName1741771052354';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19"`,
    );
    await queryRunner.query(`ALTER TABLE "sessions" RENAME COLUMN "token" TO "refresh_token"`);
    await queryRunner.query(
      `CREATE TABLE "departments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(100) NOT NULL, "description" text, CONSTRAINT "PK_839517a681a86bb84cbcc6a1e9d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "employees" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "first_name" character varying(100) NOT NULL, "last_name" character varying(100) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone_number" character varying, "status" boolean NOT NULL DEFAULT true, "role_id" uuid, "department_id" uuid, CONSTRAINT "UQ_765bc1ac8967533a04c74a9f6af" UNIQUE ("email"), CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "roles" ADD "description" text`);
    await queryRunner.query(`ALTER TABLE "roles" ADD "employee_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_727d9c30d77d3a253177b2e918f" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_678a3540f843823784b0fe4a4f2" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ADD CONSTRAINT "FK_301422b24e3c3759109f3cef84e" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19"`,
    );
    await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "FK_301422b24e3c3759109f3cef84e"`);
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "FK_678a3540f843823784b0fe4a4f2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "FK_727d9c30d77d3a253177b2e918f"`,
    );
    await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "employee_id"`);
    await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "description"`);
    await queryRunner.query(`DROP TABLE "employees"`);
    await queryRunner.query(`DROP TABLE "departments"`);
    await queryRunner.query(`ALTER TABLE "sessions" RENAME COLUMN "refresh_token" TO "token"`);
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
