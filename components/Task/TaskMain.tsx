"use client";
import * as React from "react";
import { CardGrid } from "../Grid/task-grid";

import { CardTable } from "@/components/Table/task-table";
import { useSettings } from "../wrappers/settings-provider";
import { LayoutSettings } from "../Settings/layout-settings";
import { getTasksFromLocalStorage } from "@/lib/localStorageOperations";
import { Task } from "@/prisma/generated/zod";
import GridSkeleton from "../Grid/task-grid-skeleton";
import { useTaskStore } from "@/app/store/TaskStore";


export function Tasks() {
  const { settings } = useSettings();
  const [data, setData] = React.useState<Task[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { tasks,fetchTasks } = useTaskStore();

  React.useEffect(() => {
    console.time("Task Load");

    // Initial load
    fetchTasks()
    setData(tasks);
    setLoading(false);
    console.timeEnd("Task Load");
   
  }, [fetchTasks]);
  const cachedData = React.useMemo(() => {
    return tasks;
  }, [tasks]);

  return (
    <div className="w-full flex flex-col">
      {/* <LayoutSettings/> */}
      <div className="flex gap-4 mb-5 animate-in fade-in duration-700 slide-in-from-top-4">
        <LayoutSettings />
      </div>

      {/* Cards Layout */}
      {loading ? (
        <GridSkeleton/>
      ) : settings.layoutStyle === "grid" ? (
        <React.Suspense fallback={<GridSkeleton/>}>
          <CardGrid data={cachedData} />
        </React.Suspense>
      ) : (
        <CardTable />
      )}
    </div>
  );
}
