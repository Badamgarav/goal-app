import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateGoalDto } from './create-goal.dto';

import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class UpdateGoalDto extends PartialType(CreateGoalDto) {
  @ApiPropertyOptional({ example: 'JLPT N4 pass' })
  @Transform(lowerCaseTransformer)
  @MinLength(6)
  @IsNotEmpty()
  title: string | null;

  @ApiPropertyOptional({ example: 'description for JLPT N4' })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: '2024-06-01' })
  @IsNotEmpty()
  startDate: Date | null;

  @ApiPropertyOptional({ example: '2024-07-01' })
  @IsOptional()
  endDate?: string;
}
