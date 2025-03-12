import React from 'react';
import DashboardLayout from '@/components/wrappers/dashboard-layout';
import { SettingsProvider } from '@/components/wrappers/settings-provider';
export default function DashLayout({ children}: Readonly<{
  children: React.ReactNode;
}>){
    return(
       <DashboardLayout>
        <SettingsProvider>
          <div className='min-w-[320px]'>
            {children}
          </div>
        </SettingsProvider>
        </DashboardLayout>
    )
}