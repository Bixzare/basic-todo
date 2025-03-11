import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutGrid,
  LayoutList,
  ArrowUpAZ,
  ArrowDownAZ,
  Star,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Clock,
  Flag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSettings } from "../wrappers/settings-provider";
import clsx from "clsx";

export function LayoutSettings() {
  const [position, setPosition] = React.useState("Az");
  const activeStyles = "bg-accent/60 scale-105";
  const { settings, updateSettings } = useSettings();
  const layoutStyleChange = settings.layoutStyle === "list" ? "grid" : "list";

  // any but should be layoutStyle , don't feel like importing the type

  React.useEffect(()=>{
    console.log("settings comp : ",settings)
  },[settings])

  const layoutChange = (style: any) => {
    updateSettings({ layoutStyle: style });
  };

  const layoutOrderChange = () => {
    console.log(settings.layoutAsc);
    updateSettings({ layoutAsc: !settings.layoutAsc });
  };

  return (
    <div className="flex w-full justify-between px-2">
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => layoutChange("grid")}
          className={clsx(settings.layoutStyle === "grid" && activeStyles, "")}
        >
          <LayoutGrid size={24} /> <span className="ml-1">Card</span>
        </Button>
        <Button
          variant="outline"
          onClick={() => layoutChange("list")}
          className={clsx(settings.layoutStyle === "list" && activeStyles, "")}
        >
          <LayoutList /> <span className="ml-1">List</span>
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <ArrowUpDown /> Sort
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className="flex justify-between items-center">
            <span>Order</span>
            {/* render button depending on if asc or descending */}
            <Button
              variant="secondary"
              className={clsx(settings.layoutAsc ? "inline" : "hidden", "")}
              onClick={layoutOrderChange}
            >
              <div className="flex">
                <ArrowUp size={16} />
                Asc
              </div>
            </Button>
            <Button
              variant="secondary"
              className={clsx(settings.layoutAsc ? "hidden" : "inline", "")}
              onClick={layoutOrderChange}
            >
              <div className="flex">
                <ArrowDown size={16} />
                Desc
              </div>
            </Button>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuRadioGroup value={settings.layoutOrder} onValueChange={(value:any)=>updateSettings({layoutOrder:value})}>
            <DropdownMenuRadioItem value="Az" className = {clsx({
              "bg-accent/30": settings.layoutOrder === "Az"
            })}>
               {settings.layoutAsc ? (
       <ArrowUpAZ  size = {20}/>  
      ) : (
        <ArrowDownAZ size ={20}/>
      )}
              </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="date"
            className = {clsx({
              "bg-accent/30": settings.layoutOrder === "date"
            })}><Clock size = {20} className = "mr-1"/>Status</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="priority" className = {clsx({
              "bg-accent/30": settings.layoutOrder === "priority"
            })}>
              <Flag size = {20} className = "inline mr-1"/>Priority
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
