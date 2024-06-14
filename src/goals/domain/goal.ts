import { Expose } from 'class-transformer';
import { User } from '../../users/domain/user';

export class Goal {
  id: number;
  @Expose({ groups: ['me'] })
  user: User;
  title: string;
  description?: string | null;
  endDate?: Date | null;
  startDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
