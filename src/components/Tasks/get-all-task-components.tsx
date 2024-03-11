"use client";
import React from "react";
import { type Task } from "@prisma/client";
import TaskCard from "./TaskCard/task-card";

function GetTask({ tasks }: { tasks: Task[]}) {
  return (
    <div className="grid justify-items-center gap-2 grid-cols-2 md:grid-cols-6  lg:grid-cols-8 p-4">
      {tasks &&
        tasks.length > 0 &&
        tasks.map((task) => (
          <TaskCard
            id={task.id}
            key={task.id}
            title={task.title}
            description={task.description}
            status={task.status}
          />
        ))}
      {tasks.length===0 && (<div className="text-center">Task Not Found</div>)}
    </div>
  );
}

export default GetTask;
