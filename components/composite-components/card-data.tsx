// card-data.ts
import { Task } from "@/types/schema";
export const cardData = [
  {
    title: "Zebra Card",
    description: "This is a Z card - should appear last in A-Z.",
    content: "Main content of Zebra card.",
    footer: "Created 2023-01-15",
    status: "incomplete",
    priority: "3",
    timestamp: "2023-01-15T10:30:00Z"
  },
  {
    title: "Banana Card",
    description: "This is a B card - should appear second in A-Z.",
    content: "Main content of Banana card.",
    footer: "Created 2023-04-22",
    status: "complete",
    priority: "2",
    timestamp: "2023-04-22T14:15:00Z"
  },
  {
    title: "Apple Card",
    description: "This is an A card - should appear first in A-Z.",
    content: "Main content of Apple card. This card can contain detailed information.",
    footer: "Created 2023-06-10",
    status: "incomplete",
    priority: "1",
    timestamp: "2023-06-10T09:45:00Z"
  },
  {
    title: "Mango Card",
    description: "This is an M card - should appear in the middle in A-Z.",
    content: "Main content of Mango card. More detailed content here.",
    footer: "Created 2022-11-05",
    status: "complete",
    priority: "0",
    timestamp: "2022-11-05T16:20:00Z"
  },
  {
    title: "Cherry Card",
    description: "This is a C card - should appear third in A-Z.",
    content: "Main content of Cherry card. You can add additional info here.",
    footer: "Created 2022-08-17",
    status: "complete",
    priority: "2",
    timestamp: "2022-08-17T11:10:00Z"
  },
  {
    title: "Lemon Card",
    description: "This is an L card - should appear in the middle in A-Z.",
    content: "Main content of Lemon card. Make it informative and engaging.",
    footer: "Created 2023-02-28",
    status: "complete",
    priority: "1",
    timestamp: "2023-02-28T13:40:00Z"
  },
];

export type CardData = { 
  title: string; 
  description: string; 
  content: string; 
  footer: string; 
  status: string; 
  priority: string;
  timestamp: string; 
}[];



/*

export type Task = { 
  title: string; 
  description: string; 
  content: string; 
  footer: string; 
  status: "pending" | "in-progress" | "completed" | "archived"; 
  priority: "low" | "medium" | "high" | "urgent";
  dueDate?: string; 
  reminder?: string | null;
  completedAt?: string | null;
  schedule: {
    startTime?: string; // ISO date-time
    endTime?: string;   // ISO date-time
  };
  timestamps: {
    createdAt: string;  // ISO date-time
    updatedAt: string;  // ISO date-time
  };
  category?: string;
}; 

*/