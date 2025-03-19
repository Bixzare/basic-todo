"use client"
import * as React from 'react';
import {
    DialogClose,
    DialogFooter,
  } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Task } from "@/prisma/generated/zod";
import { SimpleTaskForm } from './SimpleForm';
import { AdvancedTaskForm } from './AdvancedForm';

export function TaskForm({data}:{data?:Task}) {

    return(
      <>
        <Tabs defaultValue="account" className="w-full p-2 ">
        <TabsList className ="grid w-full grid-cols-2">
            <TabsTrigger value="simple">Simple</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* can conditionally reneder tabs for performance gains */}
        {/* Todo , use  */}
        <TabsContent value="simple" className = "h-auto p-1">
          <SimpleTaskForm data = {data}/>
            </TabsContent>
        <TabsContent value="advanced" className = "h-full">
            <AdvancedTaskForm data ={data}/>
            </TabsContent>
        </Tabs>
        

        <DialogFooter className="sm:justify-start mx-auto mb-4">
          <DialogClose asChild>
            <Button variant="secondary">
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </>
    )
}

