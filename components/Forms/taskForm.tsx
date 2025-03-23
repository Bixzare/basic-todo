"use client";
import * as React from "react";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { TaskSchema, Task } from "@/prisma/generated/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useTaskStore } from "@/app/store/taskFormStore";
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

export function TaskForm({ data }: { data?: Task }) {
  const { taskForm, setTaskForm, resetForm } = useTaskStore();

  const form = useForm<Task>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      // if data use that for edit mode else use zustand form state
      title: data ? data.title : taskForm.title,
      description: data ? data.description : taskForm.description,
      assigneeId: data ? data.assigneeId : null,
    },
  });

  const {
    formState: { isSubmitting, errors },
    reset,
  } = form;

  React.useEffect(() => {
    console.log("errors", errors);
  }, [errors]);

  async function onSubmit(values: Task) {
    console.log("Submit", values);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Post Submit", values);
    reset();
    resetForm();
  }
  // conditioanlly render advanced form fields
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
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
                  {data ? "Update Task" : "Create Task"}
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
                <FormLabel>Username</FormLabel>
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
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <button type="submit">{data? "Create Task" : "Save Task"}</button>

          <DialogClose>
            Close
          </DialogClose>
        </form>
      </Form>
    </>
  );
}
