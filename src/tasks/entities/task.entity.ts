export class Task {
  id: number;
  title: string;
  description: string;
  planned_end_date: Date | null;
  actual_end_date: Date | null;
  create_at: Date;
  user_id: number;
  is_favorite: boolean;
  category_id: number;
  users: {
    external_id: string;
  };
}
