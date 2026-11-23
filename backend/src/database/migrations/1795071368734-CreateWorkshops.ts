import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWorkshops1795071368734 implements MigrationInterface {
    name = 'CreateWorkshops1795071368734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workshops" ("id" SERIAL NOT NULL, "title" character varying(150) NOT NULL, "category" character varying(30) NOT NULL, "capacity" integer NOT NULL, "enrolled" integer NOT NULL DEFAULT '0', "description" text NOT NULL, CONSTRAINT "PK_6d0e82a124f5b53df91c8989848" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "workshops"`);
    }

}
