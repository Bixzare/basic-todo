"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import React from "react";
import { Card } from "../ui/card";

const features = {
  task: {
    title: "Task Management",
    desc: "Create customized simple to detailed tasks and manage their attributes",
    url: "/images/features/task.jpg",
  },
  schedule: {
    title: "Scheduling",
    desc: "Create, view, and update a schedule with granular control!",
    url: "/images/features/schedule.jpg",
  },
  custom: {
    title: "Quick & Easy",
    desc: "Customize the layout of your tasks, the scheduler, and personalize settings in-app",
    url: "/images/features/speed2.jpg",
  },
};

export default function Features() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-accent p-2">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className={`p-2 space-y-4`}
      >
        <h1 className={`text-7xl text-center animate-in fade-in duration-300`}>
          Welcome to Basic Todo
        </h1>
        <h3 className="text-3xl text-center">Features</h3>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(features).map(([key, feature], index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              x: index === 0 ? -30 : index === 2 ? 30 : 0,
            }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
            className="p-2"
          >
            <CardContainer key={index} className="flex ">
              <div className="absolute inset-0 z-0 ">
                <Image
                  alt={feature.title}
                  src={feature.url}
                  placeholder="blur"
                  blurDataURL={feature.url}
                  quality={100}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{
                    objectFit: "cover",
                    filter: "brightness(0.5)", // Optional: darken the background
                  }}
                />
              </div>

              <CardBody>empty</CardBody>
            </CardContainer>
          </motion.div>
        ))}
      </div>

      <h2 className="text-2xl text-center mt-2">Features In Development</h2>
      <div className="grid grid-cols-3 w-full gap-4">
        <div className="flex items-center bg-sidebar-accent/20 p-2.5 rounded-sm pb-20 py-20 animate-in fade-in" />
        <div className="flex items-center bg-sidebar-accent/20 p-2.5 rounded-sm pb-20 py-20 animate-in fade-in" />
        <div className="flex items-center bg-sidebar-accent/20 p-2.5 rounded-sm pb-20 py-20 animate-in fade-in" />
      </div>
    </div>
  );
}
