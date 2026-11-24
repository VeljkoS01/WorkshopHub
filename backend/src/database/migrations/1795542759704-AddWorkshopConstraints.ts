import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWorkshopConstraints1795542759704 implements MigrationInterface {
    name = 'AddWorkshopConstraints1795542759704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workshops" ADD CONSTRAINT "CHK_workshops_enrolled" CHECK ("enrolled" >= 0 AND "enrolled" <= "capacity")`);
        await queryRunner.query(`ALTER TABLE "workshops" ADD CONSTRAINT "CHK_workshops_capacity" CHECK ("capacity" >= 1)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workshops" DROP CONSTRAINT "CHK_workshops_capacity"`);
        await queryRunner.query(`ALTER TABLE "workshops" DROP CONSTRAINT "CHK_workshops_enrolled"`);
    }

}
