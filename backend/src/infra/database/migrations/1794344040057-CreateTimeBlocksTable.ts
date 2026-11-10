import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTimeBlocksTable1794344040057 implements MigrationInterface {
  name = 'CreateTimeBlocksTable1794344040057'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "time_blocks" ("id" uuid NOT NULL, "userId" uuid NOT NULL, "presetId" uuid, "title" character varying(120) NOT NULL, "startTime" TIMESTAMP WITH TIME ZONE NOT NULL, "endTime" TIMESTAMP WITH TIME ZONE NOT NULL, "leadMinutes" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "ck_time_blocks_lead" CHECK ("leadMinutes" >= 0), CONSTRAINT "ck_time_blocks_range" CHECK ("endTime" > "startTime"), CONSTRAINT "PK_4ed9161ce47d9840fb3e40e0288" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE INDEX "idx_time_blocks_user_start" ON "time_blocks" ("userId", "startTime") `,
    )
    await queryRunner.query(
      `ALTER TABLE "time_blocks" ADD CONSTRAINT "FK_bcec246b41084887a9ec09c51aa" FOREIGN KEY ("presetId") REFERENCES "time_block_presets"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "time_blocks" DROP CONSTRAINT "FK_bcec246b41084887a9ec09c51aa"`,
    )
    await queryRunner.query(`DROP INDEX "public"."idx_time_blocks_user_start"`)
    await queryRunner.query(`DROP TABLE "time_blocks"`)
  }
}
