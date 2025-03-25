import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bookmark, Star, Trash2 } from "lucide-react";
import { useSettings } from "../wrappers/settings-provider";
import { sortCardData } from "@/lib/sortLayout";
import clsx from "clsx";
import { Task } from "@/prisma/generated/zod";
import { format } from "date-fns";
import DialogWrapper from "../Task/TaskDialog";
import { motion } from "framer-motion";
import CardOptions from "../composite-components/Card-Options";

const MotionCard = motion.create(Card);

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
  },
  animate: (index: number) => ({
    opacity: 1,
    transition: {
      delay: 0.1 * index,
    },
  }),
};

export function CardGrid({ data }: { data: Task[] }) {
  const { settings } = useSettings();

  const formatDate = (dateString: Date) => {
    return format(new Date(dateString), "H:mm M/dd "); // Example: 03/15 09:30
  };

  const sortedData = sortCardData(data, settings);

  const updateTask = (card: Task) => {
    console.log("updateTask", card);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2">
      {sortedData.map((card, index) => (
        <DialogWrapper data={card} key={card.id}>
          <MotionCard
            variants={fadeInAnimationVariants}
            initial="initial"
            viewport={{
              once: true,
            }}
            animate="animate"
            custom={index}
            className={`w-auto transition-all hover:scale-105 relative hover:cursor-pointer`}
            key={index}
            onClick={() => updateTask(card)}
          >
            <div className="absolute size-auto top-0 right-0 -translate-x-1/2 -translate-y-1/2 py-2 px-1 rotate-180">
              <Bookmark
                size={22}
                fill={
                  card.priority === 0
                    ? "rgb(209, 213, 219)" // gray-500
                    : card.priority === 1
                    ? "rgb(34, 197, 94)" // green-500
                    : card.priority === 2
                    ? "rgb(234, 179, 8)" // yellow-500
                    : card.priority === 3
                    ? "rgb(239, 68, 68)" // red-500
                    : "none"
                }
                className={clsx("", {
                  "text-gray-300": card.priority === 0,
                  "text-green-500": card.priority === 1,
                  "text-yellow-500": card.priority === 2,
                  "text-red-500": card.priority === 3,
                })}
              />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className = "p-1">
                   <Star
                  className="inline mr-2 text-sidebar-accent"
                  fill={card.status === "completed" ? "yellow" : "transparent"}
                />
                </div>
               
                <span className="truncate max-w-full inline-block">
                  {card.title}
                </span>
              </CardTitle>
              <CardDescription className="line-clamp-2 text-ellipsis overflow-hidden">
                {card.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="truncate max-w-full">Content</CardContent>
            <CardFooter className="justify-between">
              {formatDate(card.updatedAt)}
              <CardOptions data={card}/>
            </CardFooter>
          </MotionCard>
        </DialogWrapper>
      ))}
    </div>
  );
}