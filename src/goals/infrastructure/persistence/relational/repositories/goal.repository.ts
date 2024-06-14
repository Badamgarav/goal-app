import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOptionsWhere, Repository } from 'typeorm';
import { GoalEntity } from '../entities/goal.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { FilterGoalDto, SortGoalDto } from '../../../../dto/query-goal.dto';
import { Goal } from '../../../../domain/goal';
import { GoalRepository } from '../../goal.repository';
import { GoalMapper } from '../mappers/goal.mapper';
import { EntityCondition } from '../../../../../utils/types/entity-condition.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class GoalsRelationalRepository implements GoalRepository {
  constructor(
    @InjectRepository(GoalEntity)
    private readonly goalsRepository: Repository<GoalEntity>,
  ) {}

  async create(data: Goal): Promise<Goal> {
    const persistenceModel = GoalMapper.toPersistence(data);
    const newEntity = await this.goalsRepository.save(
      this.goalsRepository.create(persistenceModel),
    );
    return GoalMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterGoalDto | null;
    sortOptions?: SortGoalDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Goal[]> {
    const where: FindOptionsWhere<GoalEntity> = {};
    if (filterOptions?.users?.length) {
      where.goal = filterOptions.goals.map((goal) => ({
        id: goal.id,
      }));
    }

    const entities = await this.goalsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });

    return entities.map((goal) => GoalMapper.toDomain(goal));
  }

  async findOne(fields: EntityCondition<Goal>): Promise<NullableType<Goal>> {
    const entity = await this.goalsRepository.findOne({
      where: fields as FindOptionsWhere<GoalEntity>,
    });

    return entity ? GoalMapper.toDomain(entity) : null;
  }

  async update(id: Goal['id'], payload: Partial<Goal>): Promise<Goal> {
    const entity = await this.goalsRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new Error('Goal not found');
    }

    const updatedEntity = await this.goalsRepository.save(
      this.goalsRepository.create(
        GoalMapper.toPersistence({
          ...GoalMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return GoalMapper.toDomain(updatedEntity);
  }

  async softDelete(id: Goal['id']): Promise<void> {
    await this.goalsRepository.softDelete(id);
  }
}
