import { CirclePlus, CircleXIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import DialogWrapper from "../wrappers/dialog-wrapper";

export default function TaskActions() {
  return (
  <DialogWrapper>
    <Button variant="outline">
          <CirclePlus size={24} />
        </Button>
  </DialogWrapper>
  );
}




// import { CirclePlus, CircleXIcon } from "lucide-react";
// import { Button } from "../ui/button";
// import {
//     Sheet,
//     SheetClose,
//     SheetContent,
//     SheetDescription,
//     SheetFooter,
//     SheetHeader,
//     SheetTitle,
//     SheetTrigger,
//   } from "@/components/ui/sheet"

// export default function TaskActions() {
//     return (
//       <Sheet>
//         <SheetTrigger asChild>
//         <Button variant={"outline"}
//                 className="">
//           <CirclePlus size = {24}/>
//         </Button>
//         </SheetTrigger>

//         <SheetContent className = "!max-w-[100vw] md:!max-w-[60vw] lg:!max-w-[50vw] ">
            
//             <SheetHeader>
//                 <SheetTitle>
//                     Create Task or Update Task also display normal or advanced options
//                 </SheetTitle>
//                 <SheetDescription>
//                     Descroption of the sheet
//                 </SheetDescription>
//             </SheetHeader>
//             <SheetFooter>
//                 <SheetClose asChild>
//                     <Button>
//                         <CircleXIcon/>
//                     </Button>
//                 </SheetClose>
//             </SheetFooter>
//         </SheetContent>
//       </Sheet>
//     )
// }