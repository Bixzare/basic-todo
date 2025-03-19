import { AppSidebar } from '@/components/Navigation/Sidebar/app-sidebar';
import NavBar from '../Navigation/Navbar/nav-bar';
import { Separator } from "@/components/ui/separator"

import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
  } from "@/components/ui/sidebar"
  

  export default function DashboardLayout({ children}: Readonly<{
    children: React.ReactNode;
  }>){
    return (
        <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
         <NavBar/>
          <main className="w-full h-full p-2 mt-20">
      {children}
    </main>
        </SidebarInset>
      </SidebarProvider>
    )
  }