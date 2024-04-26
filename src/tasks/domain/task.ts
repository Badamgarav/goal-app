import { GoalDetail } from '../../goal-details/domain/goal-detail';

export class Task {
  id: number;
  goalDetail: GoalDetail;
  title: string;
  description?: string | null;
  status: number;
  createdAt: Date;
  updatedAt: Date;
}
