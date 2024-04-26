import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTaskTable1714038912869 implements MigrationInterface {
    name = 'CreateTaskTable1714038912869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "description" character varying(255), "status" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "goalDetailId" integer NOT NULL, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_08c5bafd859621f3adb90ff8f2a" FOREIGN KEY ("goalDetailId") REFERENCES "goal_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_08c5bafd859621f3adb90ff8f2a"`);
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
