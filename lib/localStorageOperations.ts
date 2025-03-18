import { Task, TaskSchema } from "@/prisma/generated/zod";
const TASKS_KEY = "tasks"; // LocalStorage key

/** Save tasks array to localStorage */
export const saveTasksToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

/** Retrieve tasks array from localStorage */
export const getTasksFromLocalStorage = (): Task[] => {
  const storedTasks = localStorage.getItem(TASKS_KEY);
  
  if (!storedTasks) return [];

  try {
    return TaskSchema.array().parse(JSON.parse(storedTasks)); // Validate with Zod
  } catch (error) {
    console.error("Invalid task data in localStorage", error);
    return []; // Return empty array if parsing fails
  }
};

/** Add a new task */
export const addTaskToLocalStorage = (task: Task) => {
  const tasks = getTasksFromLocalStorage();
  tasks.push(task);
  saveTasksToLocalStorage(tasks);
};

/** Update an existing task */
export const updateTaskInLocalStorage = (taskId: string, updatedData: Partial<Task>) => {
  const tasks = getTasksFromLocalStorage().map((task) =>
    task.id === taskId
      ? { ...task, ...updatedData, timestamps: { ...task, updatedAt: new Date().toISOString() } }
      : task
  );
  saveTasksToLocalStorage(tasks);
};

/** Delete a task */
export const deleteTaskFromLocalStorage = (taskId: string) => {
  const tasks = getTasksFromLocalStorage().filter((task) => task.id !== taskId);
  saveTasksToLocalStorage(tasks);
};
