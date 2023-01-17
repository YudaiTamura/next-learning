const apiBaseUrl = process.env.NEXT_PUBLIC_RESTAPI_URL;

export type Task = {
  id: number;
  title: string;
  created_at: string;
};

export type Tasks = Task[];

export type TaskId = { params: { id: string } };

export default class TaskService {
  static async getAllTasksData(): Promise<Tasks> {
    try {
      const res = await fetch(new URL(`${apiBaseUrl}/api/task-list/`));
      const tasks = (await res.json()) as Tasks;
      // NOTE: 作成日時が新しい順に並び替え
      return tasks.sort((a, b) => {
        const date1 = new Date(a.created_at);
        const date2 = new Date(b.created_at);
        return date2.getTime() - date1.getTime();
      });
    } catch {
      return [];
    }
  }

  static async getAllTaskIds(): Promise<TaskId[]> {
    const res = await fetch(`${apiBaseUrl}/api/task-list`);
    const tasks = (await res.json()) as Tasks;
    return tasks.map((task) => ({
      params: {
        id: String(task.id),
      },
    }));
  }

  static async getTaskData(id: string): Promise<Task> {
    const res = await fetch(`${apiBaseUrl}/api/task-detail/${id}/`);
    return res.json() as Promise<Task>;
  }
}
