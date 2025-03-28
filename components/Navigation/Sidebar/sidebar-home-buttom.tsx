import * as React from "react";
import { ClipboardCheck } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HomeButton() {
  const pathname = usePathname();
  return (
    <SidebarMenu>
      <Link href="/dashboard">
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            isActive={pathname == "/dashboard" ? true : false}
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
              <ClipboardCheck className="size-full text-sidebar-foreground" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold text-xl">Basic Todo</span>
              <span className="truncate text-xs">v.04</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </Link>
    </SidebarMenu>

    // <SidebarMenu>
    //   <Link href = "/dashboard">
    //     <SidebarMenuItem>
    //         <SidebarMenuButton  size="lg"
    //       className=" flex justify-self-center size-full data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
    //      isActive={pathname == "/dashboard"? true:false}>
    //          <div className="flex aspect-square size-9 items-center justify-center rounded-lg ">

    //          <ClipboardCheck className = "size-4"/>
    //       </div>
    //       <div className="grid flex-1 text-left text-sm leading-tight">
    //         <span className="truncate font-semibold">
    //           Basic Todo
    //         </span>
    //         <span className="truncate text-xs">v.03</span>
    //       </div>
    //         {/* <ClipboardCheck className = "size-10"/>
    //             <div className = "flex itesm-center p-2">Basic Todo</div> */}
    //         </SidebarMenuButton>
    //     </SidebarMenuItem>
    //     </Link>
    // </SidebarMenu>
  );
}
