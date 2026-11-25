import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserActiveStatus1795595009552 implements MigrationInterface {
    name = 'AddUserActiveStatus1795595009552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isActive"`);
    }

}
