import {
    Dialog,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Task } from "@/types/schema";
import { Textarea } from "../ui/textarea";
import { useForm, FieldValues } from "react-hook-form";
import { TaskForm } from "../composite-components/taskForm";
  export default function DialogWrapper({data, children }: { data?:Task,children: React.ReactNode }){

    return (

      <Dialog>
      <DialogTrigger asChild>
       {children}
      </DialogTrigger>

{/* ********************** */}
{/* react hook form steps

register every input*/}
      <TaskForm data = {data}/>
    </Dialog>
    )

  }

