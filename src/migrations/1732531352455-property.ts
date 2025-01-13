import { MigrationInterface, QueryRunner } from 'typeorm';

export class Property1732531352455 implements MigrationInterface {
  name = 'Property1732531352455';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "property_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "description" character varying NOT NULL, "alias" character varying NOT NULL, CONSTRAINT "UQ_23e27c390c869f03768a69872dd" UNIQUE ("alias"), CONSTRAINT "PK_eb483bf7f6ddf612998949edd26" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "purpose" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "description" character varying NOT NULL, "alias" character varying NOT NULL, CONSTRAINT "UQ_95a984f4ea17db50cae694f60a9" UNIQUE ("alias"), CONSTRAINT "PK_9f89c13188de03afb221ef2a4ac" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "area" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "alias" character varying NOT NULL, "lga_id" uuid NOT NULL, CONSTRAINT "UQ_84eefe875e33b8e07b801429d26" UNIQUE ("alias"), CONSTRAINT "PK_39d5e4de490139d6535d75f42ff" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "local_government" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "alias" character varying NOT NULL, "state_id" uuid NOT NULL, CONSTRAINT "UQ_2b9ae8160f960f57fb514cdeb44" UNIQUE ("alias"), CONSTRAINT "PK_ec537da7edd442cdb548210331f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "state" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "alias" character varying NOT NULL, CONSTRAINT "UQ_c870537b5c79475749d000fff2a" UNIQUE ("alias"), CONSTRAINT "PK_549ffd046ebab1336c3a8030a12" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "building_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "description" character varying NOT NULL, "alias" character varying NOT NULL, CONSTRAINT "UQ_aabc86031b728168385fc745485" UNIQUE ("alias"), CONSTRAINT "PK_d4dbd01d842b9ae1ba154360a51" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "building_condition" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "description" character varying NOT NULL, "alias" character varying NOT NULL, CONSTRAINT "UQ_435ee955076908d34d2daaad62d" UNIQUE ("alias"), CONSTRAINT "PK_e384007e916ba9218523e496109" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "building_furnish" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "description" character varying NOT NULL, "alias" character varying NOT NULL, CONSTRAINT "UQ_05671240a352f495c0b35754024" UNIQUE ("alias"), CONSTRAINT "PK_ede9ff05fcaeeba40127477d2e4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "apartment_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "description" character varying NOT NULL, "alias" character varying NOT NULL, CONSTRAINT "UQ_9ad38613816a83a64960cf29526" UNIQUE ("alias"), CONSTRAINT "PK_606797122cad71c0ada5f737023" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."property_status_enum" AS ENUM('pending', 'approved', 'draft', 'published')`,
    );
    await queryRunner.query(
      `CREATE TABLE "property" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "description" text NOT NULL, "status" "public"."property_status_enum" NOT NULL, "title" character varying NOT NULL, "address" character varying NOT NULL, "lat" character varying NOT NULL, "long" character varying NOT NULL, "image_url" character varying array NOT NULL, "video_url" character varying, "size" integer, "toilet" integer, "rent_type" character varying, "rent_fee" integer, "damage_fee" integer, "agency_fee" integer, "service_charge" integer, "rent_duration" integer, "facilities" character varying array, "metadata" json, "user_id" uuid NOT NULL, "property_type_id" uuid NOT NULL, "purpose_id" uuid NOT NULL, "state_id" uuid NOT NULL, "lga_id" uuid NOT NULL, "building_type_id" uuid NOT NULL, "area_id" uuid NOT NULL, "building_condition_id" uuid NOT NULL, "building_furnish_id" uuid NOT NULL, "apartment_type_id" uuid NOT NULL, CONSTRAINT "PK_d80743e6191258a5003d5843b4f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "building_facility" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "description" character varying NOT NULL, "alias" character varying NOT NULL, CONSTRAINT "UQ_e6c55c4dab5a92aba6b243d769c" UNIQUE ("alias"), CONSTRAINT "PK_0173c42dad29148a6f83278c2e4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "area" ADD CONSTRAINT "FK_48c42c6df154a66db2320e84702" FOREIGN KEY ("lga_id") REFERENCES "local_government"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "local_government" ADD CONSTRAINT "FK_f9467dfde2295e3e43fbd0d5bcf" FOREIGN KEY ("state_id") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "property" ADD CONSTRAINT "FK_723792fc2012f8a4c47915d1e25" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "property" ADD CONSTRAINT "FK_513a8bd4417287609cb8e7fe84a" FOREIGN KEY ("property_type_id") REFERENCES "property_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "property" ADD CONSTRAINT "FK_80078309b32c09af3a1686e0720" FOREIGN KEY ("purpose_id") REFERENCES "purpose"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "property" ADD CONSTRAINT "FK_390f2888e31d56d0335c913f900" FOREIGN KEY ("state_id") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "property" ADD CONSTRAINT "FK_afd8248605e781f6646a83f65c9" FOREIGN KEY ("lga_id") REFERENCES "local_government"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "property" ADD CONSTRAINT "FK_3cb8afa125af5acfaeccdf67f1b" FOREIGN KEY ("building_type_id") REFERENCES "building_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "property" ADD CONSTRAINT "FK_8966853dd1bf16248b0111c9ea4" FOREIGN KEY ("area_id") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "property" ADD CONSTRAINT "FK_ae1159b602675db544d13884768" FOREIGN KEY ("building_condition_id") REFERENCES "building_condition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "property" ADD CONSTRAINT "FK_a290415f1d83a89df1ab2784508" FOREIGN KEY ("building_furnish_id") REFERENCES "building_furnish"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "property" ADD CONSTRAINT "FK_7341e50b4d78e37013c225f6025" FOREIGN KEY ("apartment_type_id") REFERENCES "apartment_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "property" DROP CONSTRAINT "FK_7341e50b4d78e37013c225f6025"`,
    );
    await queryRunner.query(
      `ALTER TABLE "property" DROP CONSTRAINT "FK_a290415f1d83a89df1ab2784508"`,
    );
    await queryRunner.query(
      `ALTER TABLE "property" DROP CONSTRAINT "FK_ae1159b602675db544d13884768"`,
    );
    await queryRunner.query(
      `ALTER TABLE "property" DROP CONSTRAINT "FK_8966853dd1bf16248b0111c9ea4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "property" DROP CONSTRAINT "FK_3cb8afa125af5acfaeccdf67f1b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "property" DROP CONSTRAINT "FK_afd8248605e781f6646a83f65c9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "property" DROP CONSTRAINT "FK_390f2888e31d56d0335c913f900"`,
    );
    await queryRunner.query(
      `ALTER TABLE "property" DROP CONSTRAINT "FK_80078309b32c09af3a1686e0720"`,
    );
    await queryRunner.query(
      `ALTER TABLE "property" DROP CONSTRAINT "FK_513a8bd4417287609cb8e7fe84a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "property" DROP CONSTRAINT "FK_723792fc2012f8a4c47915d1e25"`,
    );
    await queryRunner.query(
      `ALTER TABLE "local_government" DROP CONSTRAINT "FK_f9467dfde2295e3e43fbd0d5bcf"`,
    );
    await queryRunner.query(`ALTER TABLE "area" DROP CONSTRAINT "FK_48c42c6df154a66db2320e84702"`);
    await queryRunner.query(`DROP TABLE "building_facility"`);
    await queryRunner.query(`DROP TABLE "property"`);
    await queryRunner.query(`DROP TYPE "public"."property_status_enum"`);
    await queryRunner.query(`DROP TABLE "apartment_type"`);
    await queryRunner.query(`DROP TABLE "building_furnish"`);
    await queryRunner.query(`DROP TABLE "building_condition"`);
    await queryRunner.query(`DROP TABLE "building_type"`);
    await queryRunner.query(`DROP TABLE "state"`);
    await queryRunner.query(`DROP TABLE "local_government"`);
    await queryRunner.query(`DROP TABLE "area"`);
    await queryRunner.query(`DROP TABLE "purpose"`);
    await queryRunner.query(`DROP TABLE "property_type"`);
  }
}
