import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, MoreVertical, Trash2, ChevronDown, Plus } from "lucide-react";
import { Task } from "@/prisma/generated/zod";
import { useTaskStore } from "@/app/store/TaskStore";

export default function CardOptions( { data }: { data: Task }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const {deleteTask} = useTaskStore();
  const handleDelete = (e:React.MouseEvent) => {
    e.preventDefault();
    console.log("delete id",data.id)
    deleteTask(data.id);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <motion.button
          className="hover:bg-accent p-4 rounded-md flex items-center relative overflow-hidden"
          initial={false}
          animate={{
            rotate: isOpen ? 180 : 0,
            transition: {
              duration: 0.3,
              ease: "easeInOut",
            },
          }}
        >
          <motion.div
            key="more-vertical"
            initial={{ opacity: 1, y: 0 }}
            animate={{
              opacity: isOpen ? 0 : 1,
              y: isOpen ? 20 : 0,
              transition: {
                duration: 0.3,
                ease: "easeInOut",
              },
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <MoreVertical className="size-6" />
          </motion.div>
          <motion.div
            key="chevron-down"
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: isOpen ? 1 : 0,
              y: isOpen ? 0 : -20,
              transition: {
                duration: 0.3,
                ease: "easeInOut",
              },
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <ChevronDown className="size-6" />
          </motion.div>
        </motion.button>
      </DropdownMenuTrigger>
      <AnimatePresence>
        {isOpen && (
          <DropdownMenuContent
            onClick={(e) => {
              e.stopPropagation();
            }}
            asChild
            className="z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  console.log("Edit action");
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Schedule
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDelete}
                onSelect={(e) => {
                  e.preventDefault();

                  console.log("Delete action");
                }}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Task
              </DropdownMenuItem>
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  );
}


