import React from 'react';
import DashboardLayout from '@/components/wrappers/dashboard-layout';
import { Toaster } from "@/components/ui/sonner"
import ToastAnimated from '@/components/animation-wrappers/toastAnim';
export default function DashLayout({ children}: Readonly<{
  children: React.ReactNode;
}>){
    return(
       <DashboardLayout>
          <div className='min-w-[320px]'>
            {children}
          </div>
          <Toaster/>
        </DashboardLayout>
    )
}