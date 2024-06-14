import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { Goal } from '../../../../domain/goal';
import { GoalEntity } from '../entities/goal.entity';

export class GoalMapper {
  static toDomain(raw: GoalEntity): Goal {
    const goal = new Goal();
    goal.id = raw.id;
    goal.title = raw.title;
    goal.description = raw.description;
    goal.startDate = raw.startDate;
    goal.endDate = raw.endDate;
    goal.user = raw.user;
    goal.createdAt = raw.createdAt;
    goal.updatedAt = raw.updatedAt;
    return goal;
  }

  static toPersistence(goal: Goal): GoalEntity {
    const user = new UserEntity();
    user.id = Number(goal.user.id);

    const goalEntity = new GoalEntity();
    if (goal.id && typeof goal.id === 'number') {
      goalEntity.id = goal.id;
    }
    goalEntity.title = goal.title;
    goalEntity.description = goal.description;
    goalEntity.startDate = goal.startDate;
    goalEntity.endDate = goal.endDate;
    goalEntity.user = user;
    goalEntity.createdAt = goal.createdAt;
    goalEntity.updatedAt = goal.updatedAt;
    return goalEntity;
  }
}
