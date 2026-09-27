export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  category: "Work" | "Personal" | "Urgent";
  completed: boolean;
}
