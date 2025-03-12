"use server"
import { CirclePlus, CircleXIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import DialogWrapper from "../wrappers/dialog-wrapper";


export default async function TaskActions() {
  return (
    <div>
  <DialogWrapper>
    
    <Button variant="outline">
          <CirclePlus size={24} />
        </Button>
  </DialogWrapper>
  </div>
  );
}




