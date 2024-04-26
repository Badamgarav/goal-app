import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGoalTable1714037990982 implements MigrationInterface {
    name = 'CreateGoalTable1714037990982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "goal" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "description" character varying(255), "startDate" TIMESTAMP, "endDate" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, CONSTRAINT "PK_88c8e2b461b711336c836b1e130" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ff1f162e6a4eb28a521c11c807" ON "goal" ("endDate") `);
        await queryRunner.query(`ALTER TABLE "goal" ADD CONSTRAINT "FK_40bd308ea814964cec7146c6dce" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "goal" DROP CONSTRAINT "FK_40bd308ea814964cec7146c6dce"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ff1f162e6a4eb28a521c11c807"`);
        await queryRunner.query(`DROP TABLE "goal"`);
    }

}
