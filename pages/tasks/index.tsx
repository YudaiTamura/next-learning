import BackToMain from "../../components/BackToMain";
import Layout from "../../components/Layout";
import Task from "../../components/Task";
import TaskService, { Tasks } from "../../lib/tasks";
import useSWR from "swr";
import { useEffect } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/task-list/`;

export default function TaskPage({ tasks }: { tasks: Tasks }) {
  const { data: tasksData, mutate } = useSWR(apiUrl, fetcher, {
    fallbackData: tasks,
  });
  const filteredTasks = (tasksData as Tasks)?.sort((a, b) => {
    const date1 = new Date(a.created_at);
    const date2 = new Date(b.created_at);
    return date2.getTime() - date1.getTime();
  });
  useEffect(() => {
    mutate();
  });

  if (filteredTasks.length === 0) {
    return (
      <Layout title="Tasks">
        <div className="m-10">No Task</div>
        <BackToMain />
      </Layout>
    );
  } else {
    return (
      <Layout title="Tasks">
        <ul>{filteredTasks && filteredTasks.map((task) => <Task key={task.id} task={task} />)}</ul>
        <BackToMain />
      </Layout>
    );
  }
}

export async function getStaticProps() {
  const tasks = await TaskService.getAllTasksData();
  return {
    props: { tasks },
    revalidate: 3,
  };
}
