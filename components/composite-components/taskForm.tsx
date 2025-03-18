import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Task } from "@prisma/client";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export function TaskForm({data}:{data?:Task}) {
    return(
        <DialogContent className="max-w-[clamp(28rem,100%,50%)] overflow-y-auto max-h-[clamp(20rem,100%,60%)] p-0 ">
     
        <Tabs defaultValue="account" className="w-full bg-black">
        <TabsList className ="grid w-full grid-cols-2">
            <TabsTrigger value="simple">Simple</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* can conditionally reneder tabs for performance gains */}
        <TabsContent value="simple">
            Simple From
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
      </DialogContent>
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