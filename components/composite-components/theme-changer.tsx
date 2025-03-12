"use client"

import * as React from 'react';
import {Moon,Sun} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted,setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    },[]);

    if(!mounted) return null;

    const isDark = theme === "dark" || (theme === "system" && resolvedTheme === "dark");
    
    return (
       <button onClick ={() => setTheme(isDark ? "light" : "dark")}
        className = "p-1.5 rounded hover:bg-sidebar-accent hover:dark:bg-sidebar-accent hover:scale-125">
            {isDark ? 
            <Moon className=' h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100'/> 
            : <Sun className=" h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 " />}
       </button>
    )

}