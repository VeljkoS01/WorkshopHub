import { MigrationInterface, QueryRunner } from "typeorm";

export class NormalizeWorkshopCategories1795685051407 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            CREATE TABLE "categories" (
                "id" SERIAL NOT NULL,
                "name" varchar(30) NOT NULL,
                CONSTRAINT "PK_categories_id" PRIMARY KEY ("id"),
                CONSTRAINT "UQ_categories_name" UNIQUE ("name")
            )
        `);

        await queryRunner.query(`
            INSERT INTO "categories" ("name")
            VALUES ('frontend'), ('backend')
            ON CONFLICT ("name") DO NOTHING
        `);

        await queryRunner.query(`
            INSERT INTO "categories" ("name")
            SELECT DISTINCT "category" FROM "workshops"
            ON CONFLICT ("name") DO NOTHING
        `);

        await queryRunner.query(`
            ALTER TABLE "workshops"
            ADD COLUMN "categoryId" integer
        `);

        await queryRunner.query(`
            UPDATE "workshops" AS w
            SET "categoryId" = c."id"
            FROM "categories" AS c
            WHERE w."category" = c."name"
        `);

        await queryRunner.query(`
            ALTER TABLE "workshops"
            ALTER COLUMN "categoryId" SET NOT NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "workshops"
            ADD CONSTRAINT "FK_workshops_category"
            FOREIGN KEY ("categoryId")
            REFERENCES "categories"("id")
            ON DELETE RESTRICT
        `);

        await queryRunner.query(`
            ALTER TABLE "workshops"
            DROP COLUMN "category"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            ALTER TABLE "workshops"
            ADD COLUMN "category" varchar(30)
        `);

        await queryRunner.query(`
            UPDATE "workshops" AS w
            SET "category" = c."name"
            FROM "categories" AS c
            WHERE w."categoryId" = c."id"
        `);

        await queryRunner.query(`
            ALTER TABLE "workshops"
            ALTER COLUMN "category" SET NOT NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "workshops"
            DROP CONSTRAINT "FK_workshops_category"
        `);

        await queryRunner.query(`
            ALTER TABLE "workshops"
            DROP COLUMN "categoryId"
        `);

        await queryRunner.query(`
            DROP TABLE "categories"
        `);
    }

}
