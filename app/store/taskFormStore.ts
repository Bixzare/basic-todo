import { create } from "zustand";

interface Task {
  title: string;
  description: string;
}

interface TaskState {
  taskForm: Task;
  setTaskForm: (data: Partial<Task>) => void;
  resetForm: () => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  taskForm: { title: "", description: "" }, // ✅ Initial state
  setTaskForm: (data) =>
    set((state) => ({ taskForm: { ...state.taskForm, ...data } })), // ✅ Merge updates
  resetForm: () => set({taskForm: {title: "", description: ""}}),
}));
