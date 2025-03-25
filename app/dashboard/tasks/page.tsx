"use server"
import { Tasks } from "@/components/Task/TaskMain"
import  TaskActions  from "@/components/Grid/task-actions"
export default async function TasksPage(){
    return (
        <div className = "flex items-center size-full flex-col space">
            <div className = "w-full p-1 px-1 mb-10 flex justify-center animate-in fade-in duration-700 slide-in-from-top-4">
                <TaskActions/>
            </div>
            <div className = "w-full">
                <Tasks/>
            </div>
        </div>
    )
}