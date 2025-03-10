import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bookmark, Star } from "lucide-react";
import { Button } from "../ui/button";
import { CardData } from "./card-data";
import { useSettings } from "../wrappers/settings-provider";
import { sortCardData } from "@/lib/sortLayout";
import clsx from "clsx";

export function CardGrid({ data }: { data: CardData }) {
  const { settings } = useSettings();

  //console.log("tasks",settings) // problem not fixed , check claude to work through

  React.useEffect(() => {
    console.log("Card component actually mounted");
    return () => console.log("Card component unmounted");
  }, []);

  React.useEffect(() => {});
  const sortedData = sortCardData(data, settings);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2">
      {sortedData.map((card, index) => (
        <Card className="w-auto hover:scale-105 relative" key={index}>
          <div className=" absolute top-0 right-0  px-3 py-1 text-sm rounded-md shadow-lg">
            <Bookmark
              size={22}
              className={clsx("", {
                "text-gray-500": card.priority === "0",
                "text-green-500": card.priority === "1",
                "text-yellow-500": card.priority === "2",
                "text-red-500": card.priority === "3",
              })}
            />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star
                className="inline mr-2 text-sidebar-accent"
                fill={"transparent"}
              />
              {card.title}
            </CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </CardHeader>
          <CardContent>{card.content}</CardContent>
          <CardFooter>
            <Button variant="outline">More Info</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
