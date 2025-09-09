export class CreateTaskDto {
  title: string;
  description: string;
  planned_end_date?: Date | null;
  user_id: string;
  category_id: number;
  is_favorite: boolean;
}
