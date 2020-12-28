import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDB1609161321366 implements MigrationInterface {
    name = 'CreateDB1609161321366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "DateTest" ("id" int NOT NULL IDENTITY(1,1), "date" datetime NOT NULL, CONSTRAINT "PK_e8a043f4ec440820a2dac4c70ca" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "DateTest"`);
    }

}
