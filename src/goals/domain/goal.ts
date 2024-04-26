import { User } from '../../users/domain/user';

export class Goal {
  id: number;
  user: User;
  title: string;
  description?: string | null;
  endDate: Date | null;
  startDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
