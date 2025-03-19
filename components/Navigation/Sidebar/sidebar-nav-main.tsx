"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"


import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => ( // write logic here for if its a non collapsible navitem display something else
        <SidebarMenuItem key = {item.title} className = "h-12">
            <SidebarMenuButton asChild isActive={item.url == pathname? true : false} className =" size-full rounded-lg text-md ">
                <Link href = {item.url} className = "size-full">
                <div className ="flex aspect-square  items-center justify-center rounded-lg -ml-0.5">
                    {item.icon && <item.icon className ="size-5"/>}

                </div>

                <span>{item.title}</span></Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
 //<Collapsible
        //     key={item.title}
        //     asChild
        //     defaultOpen={item.isActive}
        //     className="group/collapsible"
        //   >
        //     <SidebarMenuItem>
        //       <CollapsibleTrigger asChild>
        //         <SidebarMenuButton tooltip={item.title}>
        //           {item.icon && <item.icon />}
        //           <span>{item.title}</span>
        //           <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
        //         </SidebarMenuButton>
        //       </CollapsibleTrigger>
        //       <CollapsibleContent>
        //         <SidebarMenuSub>
        //           {item.items?.map((subItem) => (
        //             <SidebarMenuSubItem key={subItem.title}>
        //               <SidebarMenuSubButton asChild>
        //                 <a href={subItem.url}>
        //                   <span>{subItem.title}</span>
        //                 </a>
        //               </SidebarMenuSubButton>
        //             </SidebarMenuSubItem>
        //           ))}
        //         </SidebarMenuSub>
        //       </CollapsibleContent>
        //     </SidebarMenuItem>
        //   </Collapsible>