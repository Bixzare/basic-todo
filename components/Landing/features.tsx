"use client"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

const features = {
    task: {
      title: "Task Management",
      desc: "Create customized simple to detailed tasks and manage their attributes"
    },
    schedule: {
      title: "Scheduling",
      desc: "Create, view, and update a schedule with granular control!"
    },
    Online: {
      title: "Customization",
      desc: "Customize the layout of your tasks, the scheduler, and personalize settings in-app"
    }
  };
  
  /* Animation transition keyframes delay durration translateX,Y in keyframes fade-in animation in globals.css */
  export default function Features() {

    const [ ref,isVisible ]= useIntersectionObserver({
        threshold:0.5,
        rootMargin: '50px',
        freezeOnceVisible: true,
    });

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-accent/20 p-2"
        >
        <div className={`p-2 space-y-4
                 ${isVisible ? "  animate-in fade-in   fill-mode-backwards duration-500 opacity-100 delay-150" : "opacity-0"}
                `
        }>
          <h1 className={`text-7xl text-center animate-in fade-in duration-300`}>Welcome to Basic Todo</h1>
          <h3 className="text-3xl text-center">Features</h3>
        </div>
  
        <div className="grid grid-cols-3 gap-4 w-full" ref ={ref}>
          <div
            className={` flex flex-col items-center gap-4 bg-sidebar-accent/20 p-2.5 rounded-sm pb-20 hover:scale-105 hover:outline hover:outline-bg-sidebar-accent/20 duration-300 ![transition-duration:200ms] ![transition-delay:0ms]
                ${isVisible ? "  animate-in fade-in slide-in-from-left-4  fill-mode-backwards duration-1000 opacity-100 delay-500" : "opacity-0"}
              `}
          >
            <h3 className="font-bold">Task Management</h3>
            <p>Create customized simple to detailed tasks and manage their attributes</p>
          </div>
  
          <div
            className={` flex flex-col items-center gap-4 bg-sidebar-accent/20 p-2.5 rounded-sm pb-20 hover:scale-105 hover:outline hover:outline-bg-sidebar-accent/20 duration-300 ![transition-duration:200ms] ![transition-delay:0ms]
                ${isVisible ? "  animate-in fade-in slide-in-from-bottom-4  fill-mode-backwards duration-1000 opacity-100 [animation-delay:600ms]" : "opacity-0"}
              `}>
            <h3 className="font-bold">Scheduling</h3>
            <p>Create, view, and update a schedule with granular control!</p>
          </div>
  
          <div
            className={` flex flex-col items-center gap-4 bg-sidebar-accent/20 p-2.5 rounded-sm pb-20 hover:scale-105 hover:outline hover:outline-bg-sidebar-accent/20 duration-300 ![transition-duration:200ms] ![transition-delay:0ms]
                ${isVisible ? "  animate-in fade-in slide-in-from-right-4  fill-mode-backwards duration-1000 opacity-100 delay-700" : "opacity-0"}
              `}>
            <h3 className="font-bold">Customization</h3>
            <p>Customize the layout of your tasks, the scheduler, and personalize settings in-app</p>
          </div>
        </div>
  
        <h2 className="text-2xl text-center mt-2">Features In Development</h2>
        <div className="grid grid-cols-3 w-full gap-4">
          <div
            className="flex items-center bg-sidebar-accent/20 p-2.5 rounded-sm pb-20 py-20 animate-in fade-in"
          />
          <div
            className="flex items-center bg-sidebar-accent/20 p-2.5 rounded-sm pb-20 py-20 animate-in fade-in"
          />
          <div
            className="flex items-center bg-sidebar-accent/20 p-2.5 rounded-sm pb-20 py-20 animate-in fade-in"
            //style={{ animationDelay: "0.5s" }}
          />
        </div>
      </div>
    );
  }
  