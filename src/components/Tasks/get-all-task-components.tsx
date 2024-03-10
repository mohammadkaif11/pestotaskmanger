"use client";
import React from "react";
import { useEffect, useState } from "react";
import { type Task } from "@prisma/client";
import TaskCard from "./TaskCard/task-card";
import Loader from "../icons/loader";

interface ResponseType {
  tasks: Task[];
  message: string;
}

function GetTask() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    fetchData().catch(() => {
      console.log("Error while fetching tasks");
    });
  }, []);

  const fetchData = async () => {
    try {
      setLoader(true);
      const response = await fetch("/api/task");
      const data = (await response.json()) as ResponseType;

      if (response.ok) {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      {loader ? (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div  className=" grid justify-items-center gap-4 sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard
              id={task.id}
              key={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default GetTask;
