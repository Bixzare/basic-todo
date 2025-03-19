"use client"
import * as React from 'react';
import { Textarea } from "../ui/textarea";
import { FieldValues, useForm } from "react-hook-form";
import { TaskSchema,Task } from "@/prisma/generated/zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "../ui/input";
import { useTaskStore } from "@/app/store/taskFormStore";


export function AdvancedTaskForm({data}:{data?:Task}) {
  const { taskForm,setTaskForm,resetForm} = useTaskStore();
  const {register,
    handleSubmit,
    formState: { errors, isSubmitting},
    reset,
    
  } = useForm<Task>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      // if data use that for edit mode else use zustand form state
    title:data? data.title : taskForm.title,
    description:data? data.description : taskForm.description,
    },
  });

  const form = useForm<Task>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      // if data use that for edit mode else use zustand form state
    title:data? data.title : taskForm.title,
    description:data? data.description : taskForm.description,
    },
  })



  function onSubmit(values:Task) {
    console.log(values)
  }

    return(
      <>

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">

                <Input
                {...register("title")}
                type="text"
                placeholder="Title"
                disabled={isSubmitting}
                onChange={(e) => setTaskForm({ title: e.target.value })}
                className = " border-none"/>


                <Textarea
                {...register("description")}
               placeholder="Description"
                disabled={isSubmitting}
                className = "border-none"
                onChange={(e) => setTaskForm({ description: e.target.value })}
                rows={10}
                />
                

              </form>
      
      </>
    )
}
