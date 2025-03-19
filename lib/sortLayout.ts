// utils/sort-utils.ts
import { Task } from "@/prisma/generated/zod";
interface SortSettings {
  layoutOrder: string;
  layoutAsc: boolean;
}

/**
 * Sorts card data based on provided settings
 * @param data The card data to sort
 * @param settings Settings containing layoutOrder and layoutAsc properties
 * @returns A new sorted array without modifying the original
 */
export function sortCardData(data: Task[], settings: SortSettings): Task[] {
  // Create a copy to avoid mutating the original

  return [...data].sort((a, b) => {
    // Handle different ordering methods
    switch (settings.layoutOrder) {
      case 'Az':
        // Alphabetical ordering
        const comparison = a.title.localeCompare(b.title);
        return settings.layoutAsc ? comparison : -comparison;
      
      case 'date':
        // Time-based ordering
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return settings.layoutAsc ? timeA - timeB : timeB - timeA;
        
      case 'priority':
        // Priority-based ordering (priority is now a string "1", "2", or "3")
        const priorityA = a.priority;
        const priorityB = b.priority;
        return settings.layoutAsc ? priorityA - priorityB : priorityB - priorityA;
        
      default:
        // Default to preserving the original order (same as regular array)
        return 0; // This will keep the original order intact
    }
  });
}