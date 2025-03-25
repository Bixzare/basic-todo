"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Task } from "@/prisma/generated/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { TaskForm } from "../Forms/TaskForm";
export default function TaskFormDialog({
  data,
  children,
}: {
  data?: Task;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
        <DialogTrigger asChild>
            {children}
          </DialogTrigger>

      {/* ********************** */}
      {/* react hook form steps

register every input*/}
        <DialogContent
          className="max-w-[clamp(28rem,100%,50%)] overflow-y-auto max-h-[70vh] 
            data-[state=open]:fill-mode-backwards data-[state=open]:!slide-in-from-top data-[state=closed]:animate-out data-[state=closed]:!slide-out-to-bottom  data-[state=closed]:fade-out
          p-2 "
        >
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          > */}
            <DialogTitle className="hidden">Task Title</DialogTitle>
            <DialogDescription className="hidden">
              Create or Update existing task
            </DialogDescription>
            <TaskForm data={data} />
          {/* </motion.div> */}
        </DialogContent>
    </Dialog>
  );
}
