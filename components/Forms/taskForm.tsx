"use client";
import * as React from "react";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { TaskSchema, Task } from "@/prisma/generated/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTaskFormStore } from "@/app/store/taskFormStore";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogClose } from "../ui/dialog";
import { v4 as uuidv4 } from "uuid";
import { toast } from 'sonner';
import { addTaskToLocalStorage } from "@/lib/localStorageOperations";
import { useTaskStore } from "@/app/store/TaskStore";
import { Dialog } from "@radix-ui/react-dialog";
export function TaskForm({ data }: { data?: Task }) {
  const { taskForm, setTaskForm, resetForm } = useTaskFormStore();
  const { addTask, updateTask } = useTaskStore();
  const form = useForm<Task>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      // if data use that for edit mode else use zustand form state
      id: data ? data.id : uuidv4(),
      title: data ? data.title : taskForm.title,
      description: data ? data.description : taskForm.description,
      status: data ? data.status : "pending",
      assigneeId: data ? data.assigneeId : null,
      categoryId: data ? data.categoryId : null,
      completedAt: data ? data.completedAt : null,
      createdAt: data ? data.createdAt: new Date(),
      updatedAt: data ? new Date() : new Date(),
      interval: data ? data.interval : null,
      frequency: data ? data.frequency : null,
      reminder: data ? data.reminder: null,
      startTime: data ? data.startTime: null,
      endTime: data ? data.endTime: null,
      dayOfMonth: data ? data.dayOfMonth: null,
      daysOfWeek: data ? data.daysOfWeek: null,
      dueDate: data ? data.dueDate: null,
      endDate: data ? data.endDate: null,




      
    },
  });

  const {
    formState: { isSubmitting, errors },
    reset,
  } = form;

// submit doesn't work if there's an error in zod validation

  async function onSubmit(values: Task) {
    document.getElementById('closeDialog')?.click();

    console.log("Submit", values);
    if(data){
      console.log("update",data,"new : ",values)
      updateTask(data.id,values)
      toast.success(`Success : Task Updated`)
    }
    else
    {
        addTask(values)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success(`Success : (${taskForm.title}) has been created`);
    }
  
    reset();
    resetForm();

  }
  // conditioanlly render advanced form fields
  return (
    <>
    <div className = "text-center">{data ? "Update Task" : "Create Task"}</div>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2 p-1">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Title"
                    disabled={isSubmitting}
                    onChange={(e) => {
                      field.onChange(e);
                      setTaskForm({ title: e.target.value });
                    }}
                    className=" border-none"
                  />
                </FormControl>
                <FormDescription>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className = "hidden"></FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Description"
                    disabled={isSubmitting}
                    className="border-none"
                    onChange={(e) => {
                      field.onChange(e);
                      setTaskForm({ description: e.target.value });
                    }}
                    rows={10}
                  />
                </FormControl>
                <FormDescription>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit"
          variant = "outline"
          >{data? "Create Task" : "Save Task"}</Button>
          <DialogClose className = "hidden">
          </DialogClose>
        </form>
      </Form>
    </>
  );
}

//https://sonner.emilkowal.ski/toast