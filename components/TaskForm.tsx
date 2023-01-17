import { useContext } from "react";
import { initialState, TaskContext, TaskContextType } from "../context/TaskContext";
import Cookie from "universal-cookie";
import { KeyedMutator } from "swr";

const cookie = new Cookie();

export default function TaskForm({ mutate }: { mutate: KeyedMutator<any> }) {
  const { selectedTask, setSelectedTask } = useContext<TaskContextType>(TaskContext);

  const createTask = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/tasks/`, {
      method: "POST",
      body: JSON.stringify({ title: selectedTask.title }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${cookie.get("access_token")}`,
      },
    });
    if (res.status === 401) {
      alert("JWT Token not valid");
    }
    // stateを初期化
    setSelectedTask(initialState);
    mutate();
  };

  const updateTask = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/tasks/${selectedTask.id}/`,
      {
        method: "PUT",
        body: JSON.stringify({ title: selectedTask.title }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookie.get("access_token")}`,
        },
      }
    );
    if (res.status === 401) {
      alert("JWT Token not valid");
    }
    // stateを初期化
    setSelectedTask(initialState);
    mutate();
  };

  return (
    <div>
      <form onSubmit={selectedTask.id !== 0 ? updateTask : createTask}>
        <input
          className="text-black mb-8 px-2 py-1"
          type="text"
          value={selectedTask.title}
          onChange={(event) => setSelectedTask({ ...selectedTask, title: event.target.value })}
        />
        <button
          type="submit"
          className="bg-gray-500 ml-2 hover:bg-gray-600 text-sm px-2 py-1 rounded uppercase"
        >
          {selectedTask.id !== 0 ? "update" : "create"}
        </button>
      </form>
    </div>
  );
}
