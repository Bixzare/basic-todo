"use client";
import * as React from "react";
import { CardGrid } from "../Grid/task-grid";

import { CardTable } from "@/components/Table/task-table";
import { useSettings } from "../wrappers/settings-provider";
import { LayoutSettings } from "../Settings/layout-settings";
import { getTasksFromLocalStorage } from "@/lib/localStorageOperations";
import { Task } from "@/prisma/generated/zod";
import GridSkeleton from "../Grid/task-grid-skeleton";

export function Tasks() {
  const { settings } = useSettings();
  const [data, setData] = React.useState<Task[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    console.time("Task Load");
    const data = getTasksFromLocalStorage();
    setData(data);
    setLoading(false);
    console.timeEnd("Task Load");

    //  console.log(settings)
  }, []);

  const cachedData = React.useMemo(() => {
    return data;
  }, [data]);

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
