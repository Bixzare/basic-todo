import React from 'react';

const features = {
  taskCrud: {
    title: "Task Crud",
    desc: "Create, read, update, and delete tasks"
  },
  schedule: {
    title: "Scheduling",
    desc: "Create, view, and update a schedule with granular control!"
  },
  customization: {
    title: "Customization",
    desc: "Customize the layout of your tasks, the scheduler, and personalize settings in-app"
  }
};

export default function Page() {
  return (
    <div className="w-full h-full flex p-2 flex-col items-center gap-4">
      <div className="p-2 space-y-4">
        <h1 className="text-7xl text-center">Welcome to Basic Todo</h1>
        <h3 className="text-3xl text-center">Features</h3>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full">
        {Object.values(features).map(({ title, desc }) => (
          <div
            key={title}
            className="flex flex-col items-center gap-4 bg-sidebar-accent/20 p-2.5 rounded-sm pb-20 hover:scale-105 hover:outline hover:outline-bg-sidebar-accent/20"
          >
            <h3 className="font-bold">{title}</h3>
            <p>{desc}</p>
          </div>
        ))}
      </div>

      <h2 className = "text-2xl text-center mt-2"> Features In development</h2>
        <div className = " grid grid-cols-3 w-full gap-4">
          <div className = "flex items-center bg-sidebar-accent/20 p-2.5 rounded-sm pb-20 py-20"/>
          <div className = "flex bg-sidebar-accent/20 p-2.5 rounded-sm pb-20"/>
          <div className = "flex bg-sidebar-accent/20 p-2.5 rounded-sm pb-20"/>

        </div>
    </div>
  );
}
