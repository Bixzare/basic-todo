import React from 'react';
import DashboardLayout from '@/components/composite-components/dashboard-layout';
export default function DashLayout({ children}: Readonly<{
  children: React.ReactNode;
}>){
    return(
       <DashboardLayout>
        {children}
        </DashboardLayout>
    )
}