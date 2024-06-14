import { Module } from '@nestjs/common';
import { GoalsController } from './goals.controller';
import { GoalsService } from './goals.service';
import { RelationalGoalPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FilesModule } from '../files/files.module';

const infrastructurePersistenceModule = RelationalGoalPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule, FilesModule],
  controllers: [GoalsController],
  providers: [GoalsService],
  exports: [GoalsService, infrastructurePersistenceModule],
})
export class GoalsModule {}
