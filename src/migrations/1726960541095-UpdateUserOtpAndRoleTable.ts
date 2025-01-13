import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserOtpAndRoleTable1726960541095 implements MigrationInterface {
  name = 'UpdateUserOtpAndRoleTable1726960541095';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone_number" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "firstname" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastname" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "otp_codes" DROP CONSTRAINT "FK_318b850fc020b1e0f8670f66e12"`,
    );
    await queryRunner.query(`ALTER TABLE "otp_codes" ALTER COLUMN "user_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "otp_codes" DROP COLUMN "pin_id"`);
    await queryRunner.query(`ALTER TABLE "otp_codes" ADD "pin_id" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "otp_codes" ADD CONSTRAINT "FK_318b850fc020b1e0f8670f66e12" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "otp_codes" DROP CONSTRAINT "FK_318b850fc020b1e0f8670f66e12"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
    await queryRunner.query(`ALTER TABLE "otp_codes" DROP COLUMN "pin_id"`);
    await queryRunner.query(`ALTER TABLE "otp_codes" ADD "pin_id" character varying(6) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "otp_codes" ALTER COLUMN "user_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "otp_codes" ADD CONSTRAINT "FK_318b850fc020b1e0f8670f66e12" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastname" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "firstname" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone_number" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
