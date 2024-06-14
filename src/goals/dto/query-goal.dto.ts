import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Goal } from '../domain/goal';
import { UserEntity } from '../../users/infrastructure/persistence/relational/entities/user.entity';

export class FilterGoalDto {
  @ApiPropertyOptional({ type: UserEntity })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UserEntity)
  users?: UserEntity[] | null;
}

export class SortGoalDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Goal;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryGoalDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value ? plainToInstance(SortGoalDto, JSON.parse(value)) : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortGoalDto)
  sort?: SortGoalDto[] | null;
}
