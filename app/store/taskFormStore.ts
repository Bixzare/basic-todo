import { create } from "zustand";

// *********** Is possible to persist in localstorage using zustand/middleware
interface Task {
  title: string;
  description: string;
}

interface TaskState {
  taskForm: Task;
  setTaskForm: (data: Partial<Task>) => void;
  resetForm: () => void;
}

export const useTaskFormStore = create<TaskState>((set) => ({
  taskForm: { title: "", description: "" }, // ✅ Initial state
  setTaskForm: (data) =>
    set((state) => ({ taskForm: { ...state.taskForm, ...data } })), // ✅ Merge updates
  resetForm: () => set({taskForm: {title: "", description: ""}}),
}));
