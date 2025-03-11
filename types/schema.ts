import { z } from "zod";

export const TaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  content: z.string(),
  footer: z.string(),
  status: z.enum(["pending", "in-progress", "completed", "archived"]),
  priority: z.string(), //enum(["low", "medium", "high", "urgent"]),
  schedule: z.object({
    dueDate: z.string().optional(), // Optional string
    reminder: z.string().nullable().optional(), // Can be null or missing
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
  timestamps: z.object({
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  completedAt: z.string().nullable().optional(), // Nullable & Optional
  category: z.string().optional(),
});


export type Task = z.infer<typeof TaskSchema>
