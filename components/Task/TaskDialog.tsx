import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Task } from "@/prisma/generated/zod";
import { TaskDialogContent } from "../Forms/TaskDialogContent";
import { DialogDescription } from "@radix-ui/react-dialog";
export default function TaskFormDialog({
  data,
  children,
}: {
  data?: Task;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      {/* ********************** */}
      {/* react hook form steps

register every input*/}
      <DialogContent className="max-w-[clamp(28rem,100%,50%)] overflow-y-auto max-h-[70vh] p-0 ">
        <DialogTitle className="hidden">Task Title</DialogTitle>
        <DialogDescription className="hidden">
          Create or Update existing task
        </DialogDescription>
        <TaskDialogContent data={data} />
      </DialogContent>
    </Dialog>
  );
}
