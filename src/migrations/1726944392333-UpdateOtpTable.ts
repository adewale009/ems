import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOtpTable1726944392333 implements MigrationInterface {
  name = 'UpdateOtpTable1726944392333';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "otp_codes" RENAME COLUMN "phone_number" TO "medium"`);
    await queryRunner.query(`ALTER TABLE "otp_codes" DROP COLUMN "medium"`);
    await queryRunner.query(`ALTER TABLE "otp_codes" ADD "medium" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "otp_codes" DROP COLUMN "medium"`);
    await queryRunner.query(`ALTER TABLE "otp_codes" ADD "medium" character varying(6) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "otp_codes" RENAME COLUMN "medium" TO "phone_number"`);
  }
}
