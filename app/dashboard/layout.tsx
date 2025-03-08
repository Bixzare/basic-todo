import React from 'react';
import DashboardLayout from '@/components/wrappers/dashboard-layout';
import { SettingsProvider } from '@/components/wrappers/settings-provider';
export default function DashLayout({ children}: Readonly<{
  children: React.ReactNode;
}>){
    return(
       <DashboardLayout>
        <SettingsProvider>
          {children}
        </SettingsProvider>
        </DashboardLayout>
    )
}