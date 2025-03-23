"use client";
import * as React from "react";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Task } from "@/prisma/generated/zod";
import { TaskForm } from "./TaskForm";

export function TaskDialogContent({ data }: { data?: Task }) {
  return (
    <div className="p-1">
      <TaskForm data={data} />
      <DialogFooter className="sm:justify-start mx-auto mb-4">
        <DialogClose asChild>
          <Button variant="secondary">Submit</Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
}
