import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Button } from "../ui/button";
import { CardData } from "./card-data";
export function CardGrid({ data }: { data: CardData }) { 
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2">
            {data.map((card, index) => (
                <Card className="w-auto" key={index}>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Star className="inline mr-2 text-sidebar-accent" fill={"262 50% 58%"}/>
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