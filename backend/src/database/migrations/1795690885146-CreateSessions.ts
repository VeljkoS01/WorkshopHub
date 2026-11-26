import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSessions1795690885146 implements MigrationInterface {
    name = 'CreateSessions1795690885146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sessions" ("id" SERIAL NOT NULL, "title" character varying(150) NOT NULL, "workshopId" integer NOT NULL, "startsAt" TIMESTAMP WITH TIME ZONE NOT NULL, "endsAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "CHK_sessions_time" CHECK ("endsAt" > "startsAt"), CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_sessions_workshop_start" ON "sessions"  ("workshopId", "startsAt") `);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_sessions_workshop" FOREIGN KEY ("workshopId") REFERENCES "workshops"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_sessions_workshop"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_sessions_workshop_start"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
    }

}
