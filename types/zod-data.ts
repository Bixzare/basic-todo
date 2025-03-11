import { Task } from "./schema";

export const TaskData: Task[] = [
    {
        title: "Finish Next.js Project",
        description: "Complete the dashboard and test API integration.",
        content: "Work on the dashboard UI and finalize API testing.",
        footer: "High priority",
        status: "in-progress",
        priority: "3",
        schedule: {
            dueDate: "2025-03-20T23:59:59.000Z",
            reminder: "2025-03-19T09:00:00.000Z",
            startTime: "2025-03-18T10:00:00.000Z",
            endTime: "2025-03-18T12:00:00.000Z",
        },
        timestamps: {
            createdAt: "2025-03-10T14:30:00.000Z",
            updatedAt: "2025-03-15T10:15:00.000Z",
        },
        completedAt: null,
        category: "Development",
    },
    {
        title: "Prepare Presentation",
        description: "Create slides for the upcoming AI workshop.",
        content: "Focus on real-world AI applications and case studies.",
        footer: "Slides, Notes",
        status: "pending",
        priority: "2",
        schedule: {
            dueDate: "2025-03-25T18:00:00.000Z",
            reminder: "2025-03-24T09:00:00.000Z",
            startTime: "2025-03-24T14:00:00.000Z",
            endTime: "2025-03-24T16:30:00.000Z",
        },
        timestamps: {
            createdAt: "2025-03-12T08:45:00.000Z",
            updatedAt: "2025-03-16T11:20:00.000Z",
        },
        completedAt: null,
        category: "Work",
    },
    {
        title: "Grocery Shopping",
        description: "Buy essentials for the week.",
        content: "Milk, eggs, vegetables, and snacks.",
        footer: "Use discount coupons",
        status: "completed",
        priority: "1",
        schedule: {
            dueDate: "2025-03-15T17:00:00.000Z",
            reminder: "2025-03-15T12:00:00.000Z",
            startTime: "2025-03-15T15:00:00.000Z",
            endTime: "2025-03-15T16:00:00.000Z",
        },
        timestamps: {
            createdAt: "2025-03-08T16:00:00.000Z",
            updatedAt: "2025-03-15T16:30:00.000Z",
        },
        completedAt: "2025-03-15T16:30:00.000Z",
        category: "Personal",
    },
    {
        title: "Write Blog Post",
        description: "Write an article on the latest trends in AI development.",
        content: "Discuss new tools and techniques in machine learning and AI.",
        footer: "Medium priority",
        status: "in-progress",
        priority: "2",
        schedule: {
            dueDate: "2025-03-30T23:59:59.000Z",
            reminder: "2025-03-29T10:00:00.000Z",
            startTime: "2025-03-28T09:00:00.000Z",
            endTime: "2025-03-28T12:00:00.000Z",
        },
        timestamps: {
            createdAt: "2025-03-14T10:00:00.000Z",
            updatedAt: "2025-03-16T12:00:00.000Z",
        },
        completedAt: null,
        category: "Blog",
    },
    {
        title: "Review Codebase",
        description: "Review pull requests and make necessary changes to improve the codebase.",
        content: "Ensure that all code follows best practices and is thoroughly tested.",
        footer: "High priority",
        status: "pending",
        priority: "3",
        schedule: {
            dueDate: "2025-03-22T17:00:00.000Z",
            reminder: "2025-03-21T09:00:00.000Z",
            startTime: "2025-03-21T10:00:00.000Z",
            endTime: "2025-03-21T13:00:00.000Z",
        },
        timestamps: {
            createdAt: "2025-03-15T09:30:00.000Z",
            updatedAt: "2025-03-16T08:00:00.000Z",
        },
        completedAt: null,
        category: "Development",
    },
    {
        title: "Book Doctor Appointment",
        description: "Schedule a check-up with the general physician.",
        content: "Ensure that the insurance is valid and request a health check-up.",
        footer: "Low priority",
        status: "pending",
        priority: "1",
        schedule: {
            dueDate: "2025-03-18T11:00:00.000Z",
            reminder: "2025-03-17T10:00:00.000Z",
            startTime: "2025-03-18T09:00:00.000Z",
            endTime: "2025-03-18T10:00:00.000Z",
        },
        timestamps: {
            createdAt: "2025-03-12T14:00:00.000Z",
            updatedAt: "2025-03-14T11:00:00.000Z",
        },
        completedAt: null,
        category: "Health",
    },
    {
        title: "Update Resume",
        description: "Update the resume with recent projects and work experience.",
        content: "Add new job experience and remove outdated information.",
        footer: "Medium priority",
        status: "completed",
        priority: "2",
        schedule: {
            dueDate: "2025-03-19T12:00:00.000Z",
            reminder: "2025-03-18T08:00:00.000Z",
            startTime: "2025-03-18T10:00:00.000Z",
            endTime: "2025-03-18T11:00:00.000Z",
        },
        timestamps: {
            createdAt: "2025-03-10T09:00:00.000Z",
            updatedAt: "2025-03-15T15:00:00.000Z",
        },
        completedAt: "2025-03-15T15:30:00.000Z",
        category: "Career",
    },
];
