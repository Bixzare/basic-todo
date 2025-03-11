// utils/sort-utils.ts
import { CardData } from "@/components/composite-components/card-data";
import { Task } from "@/types/schema";
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

  console.log("settings in sortLayout",settings);
  return [...data].sort((a, b) => {
    // Handle different ordering methods
    switch (settings.layoutOrder) {
      case 'Az':
        // Alphabetical ordering
        const comparison = a.title.localeCompare(b.title);
        return settings.layoutAsc ? comparison : -comparison;
      
      case 'date':
        // Time-based ordering
        const timeA = new Date(a.timestamps.createdAt).getTime();
        const timeB = new Date(b.timestamps.createdAt).getTime();
        return settings.layoutAsc ? timeA - timeB : timeB - timeA;
        
      case 'priority':
        // Priority-based ordering (priority is now a string "1", "2", or "3")
        const priorityA = parseInt(a.priority);
        const priorityB = parseInt(b.priority);
        return settings.layoutAsc ? priorityA - priorityB : priorityB - priorityA;
        
      default:
        // Default to preserving the original order (same as regular array)
        return 0; // This will keep the original order intact
    }
  });
}