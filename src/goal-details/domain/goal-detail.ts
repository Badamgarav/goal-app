import { Goal } from '../../goals/domain/goal';

export class GoalDetail {
  id: number;
  goal: Goal;
  title: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
