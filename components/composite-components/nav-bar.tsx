import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "../ui/sidebar";

export default function NavBar() {
    return (
        <nav className=" z-50 fixed top-0 left-15 bg-background w-full flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
         <div>Placeholder for something formally breadcrumb</div>
        </div>
      </nav>
    )
}