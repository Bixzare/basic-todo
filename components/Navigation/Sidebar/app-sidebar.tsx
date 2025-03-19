"use client"

import * as React from "react"

import  HomeButton  from "./sidebar-home-buttom"
import { NavMain } from "./sidebar-nav-main"
import { NavProjects } from "./sidebar-nav-projects"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import sideBarData from "./sidebar-data"
// This is sample data.
const data = sideBarData

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <HomeButton/>
      </SidebarHeader>
      <SidebarContent className = "mt-1">
        <NavMain items={data.navMain} />
        <NavProjects projects={data.recentTasks} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail/>
    </Sidebar>
  )
}
