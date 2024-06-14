import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { EntityCondition } from '../../../utils/types/entity-condition.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
// import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Goal } from '../../domain/goal';
import { FilterGoalDto, SortGoalDto } from '../../dto/query-goal.dto';

// import { FilterGoalDto, SortGoalDto } from '../../dto/query-goal.dto';

export abstract class GoalRepository {
  abstract create(
    data: Omit<Goal, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Goal>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterGoalDto | null;
    sortOptions?: SortGoalDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Goal[]>;

  abstract findOne(fields: EntityCondition<Goal>): Promise<NullableType<Goal>>;

  abstract update(
    id: Goal['id'],
    payload: DeepPartial<Goal>,
  ): Promise<Goal | null>;

  abstract softDelete(id: Goal['id']): Promise<void>;
}
