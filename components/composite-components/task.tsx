"use client"
import * as React from "react";
import { CardGrid } from "./card-grid";
import { CardData} from "./card-data";
import { cardData } from "./card-data";
import { TaskData } from "@/types/zod-data";
import { CardTable } from "@/components/composite-components/card-table"
import { useSettings } from "../wrappers/settings-provider";
import { LayoutSettings } from "./layout-settings";
export function Tasks() {
    
  const { settings } = useSettings();

  React.useEffect(()=>{
   console.log(settings) 
  },[])

  return (
    <div className ="w-full flex flex-col">
      {/* <LayoutSettings/> */}
        <div className = "flex gap-4 mb-5">
           

            <LayoutSettings/>
        </div>


        {/* Cards Layout */}
      {settings.layoutStyle === "grid" ? (
          <CardGrid data = {TaskData}/>
      ) : (
        <CardTable />
      )}
    </div>
  );
}
