"use client"
import * as React from 'react';
import {
    DialogClose,
    DialogFooter,
  } from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FieldValues, useForm } from "react-hook-form";
import { TaskSchema,Task } from "@/prisma/generated/zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "../ui/input";
import { useTaskStore } from "@/app/store/taskFormStore";

export function TaskForm({data}:{data?:Task}) {
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



  const onSubmit = async (data:FieldValues) => {
    console.log(data)

    reset()
  }
    return(
      <>
        <Tabs defaultValue="account" className="w-full bg-black">
        <TabsList className ="grid w-full grid-cols-2">
            <TabsTrigger value="simple">Simple</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* can conditionally reneder tabs for performance gains */}
        {/* Todo , use  */}
        <TabsContent value="simple">
            <form onSubmit={handleSubmit(onSubmit)} className="">

                <Input
                {...register("title")}
                type="text"
                placeholder="Title"
                disabled={isSubmitting}
                onChange={(e) => setTaskForm({ title: e.target.value })}
                className = ""/>


                <Textarea
                {...register("description")}
               placeholder="Description"
                disabled={isSubmitting}
                className = ""
                onChange={(e) => setTaskForm({ description: e.target.value })}
                rows={10}
                />
                

              </form>
            </TabsContent>
        <TabsContent value="advanced">
            Advanced
            </TabsContent>
        </Tabs>
        

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </>
    )
}
/*
<div className="space-y-4">

<div className="grid gap-2">
  <input
    id="task-name"
    type="text"
    className="w-full border rounded-md px-3 py-2"
    placeholder="Title"
    defaultValue = {data? data.title : "" }
  />
</div>


<div className="grid gap-2">

  <Textarea className = "no-underline border-none rounded-xm"
      id="task-desc"
      // className="w-full border rounded-md px-3 py-2"
      placeholder="Description"
      defaultValue={data? data.description : ""}
      cols ={50}
      rows ={20}/>

</div>
</div> */