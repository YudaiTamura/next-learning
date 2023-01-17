import { useEffect } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import TaskService, { Task, TaskId } from "../../lib/tasks";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TaskDetail({ staticTask, id }: { staticTask: Task; id: string }) {
  const router = useRouter();
  const { data: task, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/task-detail/${id}`,
    fetcher,
    {
      fallbackData: staticTask,
    }
  );
  useEffect(() => {
    mutate();
  });

  if (router.isFallback || !task) {
    return <Layout>Loading...</Layout>;
  }
  return (
    <Layout title={task.title}>
      <span className="mb-4">ID : {task.id}</span>
      <p className="mb-4 text-xl font-bold">{task.title}</p>
      <p className="mb-12">{task.created_at}</p>
      <Link href="/tasks">
        <div className="flex cursor-pointer mt-8">
          <svg
            className="w-6 h-6 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <span>Back to Tasks</span>
        </div>
      </Link>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await TaskService.getAllTaskIds();
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: TaskId) {
  const staticTask = await TaskService.getTaskData(params.id);
  return {
    props: {
      id: staticTask.id,
      staticTask,
    },
    revalidate: 3,
  };
}
