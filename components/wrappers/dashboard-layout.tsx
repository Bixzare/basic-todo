import { AppSidebar } from '@/components/composite-components/app-sidebar';
import { cn } from '@/lib/utils';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  
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
          <header className=" z-50 fixed top-0 left-15 bg-background w-full flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
             <div>Placeholder for something formally breadcrumb</div>
            </div>
          </header>
          <main className="w-full h-full p-2 mt-20">
      {children}
    </main>
        </SidebarInset>
      </SidebarProvider>
    )
  }