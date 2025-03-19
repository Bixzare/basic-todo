import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
  } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Task } from "@/prisma/generated/zod";
import { Textarea } from "../ui/textarea";
import { useForm, FieldValues } from "react-hook-form";
import { TaskForm } from "../Forms/taskForm";
import { DialogDescription } from "@radix-ui/react-dialog";
  export default function DialogWrapper({data, children }: { data?:Task,children: React.ReactNode }){

    return (

      <Dialog>
      <DialogTrigger asChild>
       {children}
      </DialogTrigger>

{/* ********************** */}
{/* react hook form steps

register every input*/}
  <DialogContent  className="max-w-[clamp(28rem,100%,50%)] overflow-y-auto h-[70vh] p-0 ">
    <DialogTitle className ="hidden">
    Task Title
    </DialogTitle>
    <DialogDescription className = "hidden">
      Create or Update existing task
    </DialogDescription>
          <TaskForm data = {data}/>

  </DialogContent>
    </Dialog>
    )

  }

