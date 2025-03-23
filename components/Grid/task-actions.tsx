"use server"
import { CirclePlus, CircleXIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaskFormDialog from "../Task/TaskDialog";


export default async function TaskActions() {
  return (
    <div>
  <TaskFormDialog>
    
    <Button variant="outline">
          <CirclePlus size={24} />
        </Button>
  </TaskFormDialog>
  </div>
  );
}




