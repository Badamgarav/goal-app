import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { NullableType } from '../utils/types/nullable.type';
// import { FilterGoalDto, SortGoalDto } from './dto/query-goal.dto';
import { GoalRepository } from './infrastructure/persistence/goal.repository';
import { Goal } from './domain/goal';
import { RoleEnum } from '../roles/roles.enum';
import { EntityCondition } from '../utils/types/entity-condition.type';
// import { IPaginationOptions } from '../utils/types/pagination-options';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { FilterGoalDto, SortGoalDto } from './dto/query-goal.dto';
import { IPaginationOptions } from '../utils/types/pagination-options';

@Injectable()
export class GoalsService {
  constructor(private readonly goalsRepository: GoalRepository) {}

  async create(createGoalDto: CreateGoalDto): Promise<Goal> {
    const clonedPayload = { createGoalDto };

    if (clonedPayload.title) {
      const goalObject = await this.goalsRepository.findOne({
        title: clonedPayload.title,
      });
      if (goalObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'titleAlreadyExists',
          },
        });
      }
    }

    if (clonedPayload.user?.id) {
      const roleObject = Object.values(RoleEnum)
        .map(String)
        .includes(String(clonedPayload.user.id));
      if (!roleObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            role: 'userNotExists',
          },
        });
      }
    }

    return this.goalsRepository.create(clonedPayload);
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterGoalDto | null;
    sortOptions?: SortGoalDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Goal[]> {
    return this.goalsRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findOne(fields: EntityCondition<Goal>): Promise<NullableType<Goal>> {
    return this.goalsRepository.findOne(fields);
  }

  async update(
    id: Goal['id'],
    payload: DeepPartial<Goal>,
  ): Promise<Goal | null> {
    const clonedPayload = { ...payload };

    if (clonedPayload.user?.id) {
      const roleObject = Object.values(RoleEnum)
        .map(String)
        .includes(String(clonedPayload.user.id));
      if (!roleObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            role: 'userNotExists',
          },
        });
      }
    }

    return this.goalsRepository.update(id, clonedPayload);
  }

  async softDelete(id: Goal['id']): Promise<void> {
    await this.goalsRepository.softDelete(id);
  }
}
