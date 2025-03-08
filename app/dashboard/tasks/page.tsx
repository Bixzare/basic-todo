"use server"
import { Tasks } from "@/components/composite-components/task"
export default async function TasksPage(){
    return (
        <div className = "flex items-center size-full flex-col space">
            <div className = "w-full p-1 px-1 mb-10">
                Tasks
            </div>
            <div className = "w-full">
                <Tasks/>
            </div>
        </div>
    )
}