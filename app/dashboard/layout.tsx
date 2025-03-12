import React from 'react';
import DashboardLayout from '@/components/wrappers/dashboard-layout';
export default function DashLayout({ children}: Readonly<{
  children: React.ReactNode;
}>){
    return(
       <DashboardLayout>
          <div className='min-w-[320px]'>
            {children}
          </div>
        </DashboardLayout>
    )
}