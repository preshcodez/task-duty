import api from "../api/axios";

type SearchTask = {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  category: "Work" | "Personal" | "Urgent";
  completed: boolean;
};

type SearchResponse = {
  success: boolean;
  data: {
    tasks: SearchTask[];
  };
};

export const searchTasks = async (search: string): Promise<SearchTask[]> => {
  const response = await api.get<SearchResponse>(
    `/tasks?search=${encodeURIComponent(search)}`,
  );

  return response.data.data.tasks;
};
