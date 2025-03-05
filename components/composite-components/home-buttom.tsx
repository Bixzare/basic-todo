import * as React from 'react';
import { ClipboardCheck } from 'lucide-react';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"

export default function HomeButton() {
    const { isMobile } = useSidebar();
    
    return (

        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton  size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
                 <div className="flex aspect-square size-9 items-center justify-center rounded-lg ">
                 <ClipboardCheck className = "size-10"/>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  Basic Todo
                </span>
                <span className="truncate text-xs">v.01</span>
              </div>
                {/* <ClipboardCheck className = "size-10"/>
                    <div className = "flex itesm-center p-2">Basic Todo</div> */}
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}