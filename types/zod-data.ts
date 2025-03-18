import { Task } from "@/prisma/generated/zod";

export const TaskData: Task[] = [
  {
    id: crypto.randomUUID(),
    title: "Finish Next.js Project",
    description: "Complete the dashboard and test API integration.",
    priority: 3, // change to a number
    status: "in_progress", // assuming it's a valid value of TaskStatusSchema
    frequency: null,
    dueDate: new Date("2025-03-20T23:59:59.000Z"),
    reminder: new Date("2025-03-19T09:00:00.000Z"),
    startTime: new Date("2025-03-18T10:00:00.000Z"),
    endTime: new Date("2025-03-18T12:00:00.000Z"),
    isRecurring: false, // assuming you want this to be false, change if needed
    interval: null,
    endDate: null,
    daysOfWeek: null,
    dayOfMonth: null,
    createdAt: new Date("2025-03-10T14:30:00.000Z"),
    updatedAt: new Date("2025-03-15T10:15:00.000Z"),
    completedAt: null,
    assigneeId: null,
    categoryId: null,
  },
  {
    id: crypto.randomUUID(),
    title: "Prepare Presentation",
    description: "Create slides for the upcoming AI workshop.",
    priority: 2, // change to a number
    status: "pending", // assuming it's a valid value of TaskStatusSchema
    frequency:null,
    dueDate: new Date("2025-03-25T18:00:00.000Z"),
    reminder: new Date("2025-03-24T09:00:00.000Z"),
    startTime: new Date("2025-03-24T14:00:00.000Z"),
    endTime: new Date("2025-03-24T16:30:00.000Z"),
    isRecurring: false, // assuming you want this to be false, change if needed
    interval: null,
    endDate: null,
    daysOfWeek: null,
    dayOfMonth: null,
    createdAt: new Date("2025-03-12T08:45:00.000Z"),
    updatedAt: new Date("2025-03-16T11:20:00.000Z"),
    completedAt: null,
    assigneeId: null,
    categoryId: null,
  },
  {
    id: crypto.randomUUID(),
    title: "Grocery Shopping",
    description: "Buy essentials for the week.",
    priority: 1, // change to a number
    status: "completed", // assuming it's a valid value of TaskStatusSchema
    frequency:null,
    dueDate: new Date("2025-03-15T17:00:00.000Z"),
    reminder: new Date("2025-03-15T12:00:00.000Z"),
    startTime: new Date("2025-03-15T15:00:00.000Z"),
    endTime: new Date("2025-03-15T16:00:00.000Z"),
    isRecurring: false, // assuming you want this to be false, change if needed
    interval: null,
    endDate: null,
    daysOfWeek: null,
    dayOfMonth: null,
    createdAt: new Date("2025-03-08T16:00:00.000Z"),
    updatedAt: new Date("2025-03-15T16:30:00.000Z"),
    completedAt: new Date("2025-03-15T16:30:00.000Z"),
    assigneeId: null,
    categoryId: null,
  },
  {
    id: crypto.randomUUID(),
    title: "Write Blog Post",
    description: "Write an article on the latest trends in AI development.",
    priority: 2, // change to a number
    status: "in_progress", // assuming it's a valid value of TaskStatusSchema
    frequency:null,
    dueDate: new Date("2025-03-30T23:59:59.000Z"),
    reminder: new Date("2025-03-29T10:00:00.000Z"),
    startTime: new Date("2025-03-28T09:00:00.000Z"),
    endTime: new Date("2025-03-28T12:00:00.000Z"),
    isRecurring: false, // assuming you want this to be false, change if needed
    interval: null,
    endDate: null,
    daysOfWeek: null,
    dayOfMonth: null,
    createdAt: new Date("2025-03-14T10:00:00.000Z"),
    updatedAt: new Date("2025-03-16T12:00:00.000Z"),
    completedAt: null,
    assigneeId: null,
    categoryId: null,
  },
  {
    id: crypto.randomUUID(),
    title: "Review Codebase",
    description: "Review pull requests and make necessary changes to improve the codebase.",
    priority: 3, // change to a number
    status: "pending", // assuming it's a valid value of TaskStatusSchema
    frequency:null,
    dueDate: new Date("2025-03-22T17:00:00.000Z"),
    reminder: new Date("2025-03-21T09:00:00.000Z"),
    startTime: new Date("2025-03-21T10:00:00.000Z"),
    endTime: new Date("2025-03-21T13:00:00.000Z"),
    isRecurring: false, // assuming you want this to be false, change if needed
    interval: null,
    endDate: null,
    daysOfWeek: null,
    dayOfMonth: null,
    createdAt: new Date("2025-03-15T09:30:00.000Z"),
    updatedAt: new Date("2025-03-16T08:00:00.000Z"),
    completedAt: null,
    assigneeId: null,
    categoryId: null,
  },
  {
    id: crypto.randomUUID(),
    title: "Book Doctor Appointment",
    description: "Schedule a check-up with the general physician.",
    priority: 1, // change to a number
    status: "pending", // assuming it's a valid value of TaskStatusSchema
    frequency:null,
    dueDate: new Date("2025-03-18T11:00:00.000Z"),
    reminder: new Date("2025-03-17T10:00:00.000Z"),
    startTime: new Date("2025-03-18T09:00:00.000Z"),
    endTime: new Date("2025-03-18T10:00:00.000Z"),
    isRecurring: false, // assuming you want this to be false, change if needed
    interval: null,
    endDate: null,
    daysOfWeek: null,
    dayOfMonth: null,
    createdAt: new Date("2025-03-12T14:00:00.000Z"),
    updatedAt: new Date("2025-03-14T11:00:00.000Z"),
    completedAt: null,
    assigneeId: null,
    categoryId: null,
  },
  {
    id: crypto.randomUUID(),
    title: "Update Resume",
    description: "Update the resume with recent projects and work experience.",
    priority: 2, // change to a number
    status: "completed", // assuming it's a valid value of TaskStatusSchema
    frequency:null,
    dueDate: new Date("2025-03-19T12:00:00.000Z"),
    reminder: new Date("2025-03-18T08:00:00.000Z"),
    startTime: new Date("2025-03-18T10:00:00.000Z"),
    endTime: new Date("2025-03-18T11:00:00.000Z"),
    isRecurring: false, // assuming you want this to be false, change if needed
    interval: null,
    endDate: null,
    daysOfWeek: null,
    dayOfMonth: null,
    createdAt: new Date("2025-03-10T09:00:00.000Z"),
    updatedAt: new Date("2025-03-15T15:00:00.000Z"),
    completedAt: new Date("2025-03-15T15:30:00.000Z"),
    assigneeId: null,
    categoryId: null,
  }
];
