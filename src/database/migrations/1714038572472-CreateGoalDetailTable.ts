import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGoalDetailTable1714038572472 implements MigrationInterface {
    name = 'CreateGoalDetailTable1714038572472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "goal_detail" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "description" character varying(255), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "goalId" integer NOT NULL, CONSTRAINT "PK_d3ed089b637949fb199d6594ad9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "goal_detail" ADD CONSTRAINT "FK_3b37b2c14a84dbd764397a70eb6" FOREIGN KEY ("goalId") REFERENCES "goal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "goal_detail" DROP CONSTRAINT "FK_3b37b2c14a84dbd764397a70eb6"`);
        await queryRunner.query(`DROP TABLE "goal_detail"`);
    }

}
