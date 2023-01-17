import { createContext, Dispatch, SetStateAction, useState } from "react";

export type TaskStateType = {
  id: number;
  title: string;
};

export type TaskContextType = {
  selectedTask: TaskStateType;
  setSelectedTask: Dispatch<SetStateAction<TaskStateType>>;
};

export const initialState = Object.freeze({ id: 0, title: "" });

export const TaskContext = createContext<TaskContextType>({
  selectedTask: initialState,
  setSelectedTask: () => {},
});

export default function TaskContextProvider({ children }: { children: React.ReactNode }) {
  const [selectedTask, setSelectedTask] = useState<TaskStateType>(initialState);
  return (
    <TaskContext.Provider value={{ selectedTask, setSelectedTask }}>
      {children}
    </TaskContext.Provider>
  );
}
