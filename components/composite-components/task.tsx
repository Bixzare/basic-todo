"use client"
import * as React from "react";
import { CardGrid } from "./card-grid";
import { CardData} from "./card-data";
import { cardData } from "./card-data";
import { CardTable } from "@/components/composite-components/card-table"
import { LayoutGrid,LayoutList,
  ArrowUpAZ,
  ArrowDownAZ,
  Star
  
 } from "lucide-react"
import { useState } from "react";

export function Tasks() {
    // use single object state and update using spread operator
    const layoutDefault = [
      {layoutStyle:"grid", // grid list 
       layoutOrder:"AZ", // Az Za none
       layoutStatus:"none", // complete incomplete none
       layoutPriority:"none" // high med low none
      
      }
      ,
    ]
    /*layout options 
    layoutStyle grid or list
    layoutOrder Az Za newest oldest status(complete or imcomplete) priority asd priority desc */

    const [layout,setLayout] = useState("grid");
    // will use context to get layout state

  return (
    <div className ="w-full flex flex-col">

        <div className = "flex gap-4 mb-5">
            <div className = " p-1.5 flex items-center justify-center  hover:bg-sidebar-accent/40  rounded-xl hover:cursor-pointer hover:text-sidebar-primary-foreground"
            onClick = {()=> setLayout("grid")} >
            <LayoutGrid size ={24} className = "text-black" /> <span className = "ml-1">Card</span>
            </div>
            <div className = "p-1.5 flex items-center justify-center  hover:bg-sidebar-accent/40  rounded-xl hover:cursor-pointer hover:text-sidebar-primary-foreground"
            onClick = {()=> setLayout("list")}>
            <LayoutList /> <span className = "ml-1">List</span>
            </div>
        </div>


        {/* Cards Layout */}
      {layout === "grid" ? (
          <CardGrid data = {cardData}/>
      ) : (
        <CardTable />
      )}
    </div>
  );
}
