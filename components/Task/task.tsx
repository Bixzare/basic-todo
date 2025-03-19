"use client"
import * as React from "react";
import { CardGrid } from "../Grid/task-grid";

import { CardTable } from "@/components/Table/task-table"
import { useSettings } from "../wrappers/settings-provider";
import { LayoutSettings } from "../Settings/layout-settings";
import { getTasksFromLocalStorage, saveTasksToLocalStorage } from "@/lib/localStorageOperations";
import { Task } from "@/prisma/generated/zod";

export function Tasks() {
    
  const { settings } = useSettings();
  const [data, setData] = React.useState<Task[]>([]);


  React.useEffect(()=>{
    
  console.time("Task Load");
  const data = getTasksFromLocalStorage();
  setData(data);
  console.timeEnd("Task Load");

  //  console.log(settings) 
  },[])
  
  const cachedData = React.useMemo(() => {
    return data;
  }, [data]);

  return (
    <div className ="w-full flex flex-col">
      {/* <LayoutSettings/> */}
        <div className = "flex gap-4 mb-5">
           

            <LayoutSettings/>
        </div>

    

        {/* Cards Layout */}
      {settings.layoutStyle === "grid" ? (
        <React.Suspense fallback = "Loading...">
          <CardGrid data = {cachedData}/>
        </React.Suspense>
      ) : (
        <CardTable />
      )}
    </div>
  );
}
