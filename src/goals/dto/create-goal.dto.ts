import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGoalDto {
  @ApiProperty({ example: 'JLPT N5 pass' })
  @Transform(lowerCaseTransformer)
  @MinLength(6)
  @IsNotEmpty()
  title: string | null;

  @ApiProperty({ example: 'description for JLPT N5' })
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '2024-06-01' })
  @IsNotEmpty()
  startDate: Date | null;

  @ApiProperty({ example: '2024-07-01' })
  @IsOptional()
  endDate?: string;

  // @ApiPropertyOptional({ type: UserEntity })
  // @IsNotEmpty()
  // @Type(() => UserEntity)
  // user: UserEntity;
}
