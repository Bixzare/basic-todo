import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Task } from "@/types/schema";
  export default function DialogWrapper({data, children }: { data?:Task,children: React.ReactNode }){

    return (

      <Dialog>
      <DialogTrigger asChild>
       {children}
      </DialogTrigger>

      <DialogContent className="sm:!max-w-md md:!max-w-lg lg:!max-w-xl ">
        <DialogHeader>
          <DialogTitle>{data? "Update Task" : "Create Task"}</DialogTitle>
          <DialogDescription>
            Enter task details and select normal or advanced options.
          </DialogDescription>
        </DialogHeader>

        {/* Form or Task Input Fields (Placeholder) */}
        <div className="space-y-4">
          {/* Task Name Input */}
          <div className="grid gap-2">
            <label htmlFor="task-name" className="text-sm font-medium">
              Task Name
            </label>
            <input
              id="task-name"
              type="text"
              className="w-full border rounded-md px-3 py-2"
              placeholder="Enter task name"
              defaultValue = {data? data.title : "" }
            />
          </div>

          {/* Task Description Input */}
          <div className="grid gap-2">
            <label htmlFor="task-desc" className="text-sm font-medium">
              Task Description
            </label>
            <textarea
              id="task-desc"
              className="w-full border rounded-md px-3 py-2"
              placeholder="Enter task details"
              defaultValue={data? data.description : ""}
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    )

  }