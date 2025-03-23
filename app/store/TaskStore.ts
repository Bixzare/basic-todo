// import { create } from 'zustand';
// import { Task } from '@/prisma/generated/zod';

// interface TaskState {
//   tasks: Task[];
//   currentPage: number;
//   pageSize: number;
//   hasMore: boolean;
//   isLoading: boolean;
  
//   // Fetching actions
//   fetchTasks: (page?: number) => Promise<void>;
//   fetchNextPage: () => Promise<void>;
  
//   // CRUD actions
//   addTask: (task: Task) => Promise<void>;
//   updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
//   deleteTask: (id: string) => Promise<void>;
  
//   // Helper actions
//   reset: () => void;
// }

// export const useTaskStore = create<TaskState>((set, get) => ({
//   tasks: [],
//   currentPage: 1,
//   pageSize: 10,
//   hasMore: true,
//   isLoading: false,
  
//   fetchTasks: async (page = 1) => {
//     set({ isLoading: true });
    
//     try {
//       // Fetch from Supabase or fallback to localStorage
//       const response = await fetch(`/api/tasks?page=${page}&limit=${get().pageSize}`);
//       const data = await response.json();
      
//       set({
//         tasks: page === 1 ? data.tasks : [...get().tasks, ...data.tasks],
//         currentPage: page,
//         hasMore: data.tasks.length === get().pageSize,
//         isLoading: false
//       });
      
//       // Optional: Update localStorage for offline access
//       localStorage.setItem('cachedTasks', JSON.stringify(get().tasks));
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//       set({ isLoading: false });
      
//       // Try loading from localStorage as fallback
//       const cachedTasks = localStorage.getItem('cachedTasks');
//       if (cachedTasks) {
//         set({ tasks: JSON.parse(cachedTasks) });
//       }
//     }
//   },
  
//   fetchNextPage: async () => {
//     if (!get().hasMore || get().isLoading) return;
//     await get().fetchTasks(get().currentPage + 1);
//   },
  
//   addTask: async (task) => {
//     try {
//       const response = await fetch('/api/tasks', {
//         method: 'POST',
//         body: JSON.stringify(task),
//         headers: { 'Content-Type': 'application/json' }
//       });
      
//       // Refresh tasks to get the updated list
//       await get().fetchTasks(1);
//     } catch (error) {
//       console.error('Error adding task:', error);
//     }
//   },
  
//   updateTask: async (id, updates) => {
//     try {
//       await fetch(`/api/tasks/${id}`, {
//         method: 'PATCH',
//         body: JSON.stringify(updates),
//         headers: { 'Content-Type': 'application/json' }
//       });
      
//       // Refresh tasks to get the updated list
//       await get().fetchTasks(1);
//     } catch (error) {
//       console.error('Error updating task:', error);
//     }
//   },
  
//   deleteTask: async (id) => {
//     try {
//       await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      
//       // Refresh tasks to get the updated list
//       await get().fetchTasks(1);
//     } catch (error) {
//       console.error('Error deleting task:', error);
//     }
//   },
  
//   reset: () => {
//     set({ tasks: [], currentPage: 1, hasMore: true });
//   }
// }));