import React from 'react';

export default function DashLayout({ children}: Readonly<{
  children: React.ReactNode;
}>){
    return(
        <div>
            <h1>Layout</h1>
        {children}
        </div>
    )
}