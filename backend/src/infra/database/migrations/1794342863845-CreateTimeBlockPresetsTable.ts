import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTimeBlockPresetsTable1794342863845 implements MigrationInterface {
  name = 'CreateTimeBlockPresetsTable1794342863845'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "time_block_presets" ("id" uuid NOT NULL, "userId" uuid NOT NULL, "title" character varying(120) NOT NULL, "durationMinutes" integer NOT NULL, "leadMinutes" integer NOT NULL DEFAULT '10', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "ck_time_block_presets_lead" CHECK ("leadMinutes" >= 0), CONSTRAINT "ck_time_block_presets_duration" CHECK ("durationMinutes" > 0), CONSTRAINT "PK_bdfb78f55ff8e83d09425288d7f" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "uq_time_block_presets_user_title_active" ON "time_block_presets" ("userId", "title") WHERE "deletedAt" IS NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."uq_time_block_presets_user_title_active"`,
    )
    await queryRunner.query(`DROP TABLE "time_block_presets"`)
  }
}
