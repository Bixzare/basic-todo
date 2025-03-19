import {
 ListTodo,
 CalendarDays,
 LayoutGrid,
 Settings,
 Bug,
 UserCheck,
 FileText,
} from "lucide-react"

const sideBarData = {
    user: {
      name: "Guest",
      email: "guest-user@example.com",
      avatar: "/avatars/shadcn.jpg", // Profile handled as an icon in the sidebar
    },
    navMain: [
      {
        title: "Tasks",
        url: "/dashboard/tasks",
        icon: ListTodo, // Task list icon
        isActive: true,
        items: [
          {
            title: "All Tasks",
            url: "/tasks/all",
          },
          {
            title: "Starred",
            url: "/tasks/starred",
          },
          {
            title: "Completed",
            url: "/tasks/completed",
          },
        ],
      },
      {
        title: "Schedule",
        url: "/dashboard/schedule",
        icon: CalendarDays, // Calendar icon
        items: [
          {
            title: "Today",
            url: "/schedule/today",
          },
          {
            title: "Upcoming",
            url: "/schedule/upcoming",
          },
          {
            title: "Reminders",
            url: "/schedule/reminders",
          },
        ],
      },
      {
        title: "Placeholder",
        url: "/placeholder",
        icon: LayoutGrid, // Placeholder section (can be used for future features)
        items: [
          {
            title: "Feature 1",
            url: "/placeholder/feature1",
          },
          {
            title: "Feature 2",
            url: "/placeholder/feature2",
          },
        ],
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings, // Settings icon
        items: [
          {
            title: "General",
            url: "/settings/general",
          },
          {
            title: "Appearance",
            url: "/settings/appearance",
          },
          {
            title: "Notifications",
            url: "/settings/notifications",
          },
        ],
      },
    ],
    recentTasks: [
      {
        name: "Fix Landing Page Bug",
        url: "/tasks/123",
        icon: Bug, // Task-related icon
      },
      {
        name: "Prepare Sprint Report",
        url: "/tasks/456",
        icon: FileText, // Document icon
      },
      {
        name: "Follow up with Client",
        url: "/tasks/789",
        icon: UserCheck, // User-related icon
      },
    ],
  };
  
  export default sideBarData