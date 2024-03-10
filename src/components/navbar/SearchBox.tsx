"use client";
import React, { useState, useEffect } from "react";
import CreateTaskModalButton from "../Tasks/create/create-task-modal-button";
import GetTask from "../Tasks/get-all-task-components";
import { Task } from "@prisma/client";
import Loader from "../icons/loader";

interface ResponseType {
  tasks: Task[];
  message: string;
}

function SearchBox() {
  const [statusId, setStatusId] = useState(0);
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const queryString = `?status=${statusId}&title=${title}`;
      setLoader(true);
      const response = await fetch(`/api/task${queryString}`);
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

  useEffect(() => {
    fetchData().catch(() => {
      console.log("Error while fetching tasks");
    });
  }, [statusId,title]);

  return (
    <div>
      <div className="my-2 flex   justify-center gap-2">
        <CreateTaskModalButton></CreateTaskModalButton>
        <div className="flex">
          <label
            htmlFor="search-dropdown"
            className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Email
          </label>
          <select
            id="countries"
            defaultValue={0}
            value={statusId}
            onChange={(e) => {
              setStatusId(Number(e.target.value));
            }}
            className="block  border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option value="0">chooseStatus</option>
            <option value="1">Pending</option>
            <option value="2">InProgress</option>
            <option value="3">Done</option>
          </select>
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="z-20 block w-full rounded-e-lg border border-s-2 border-gray-300 border-s-gray-50 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
              placeholder="Task Title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
            />
            <button
              type="submit"
              className="absolute end-0 top-0 h-full rounded-e-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="h-4 w-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </div>
      <div>
        {loader ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <GetTask tasks={tasks} />
        )}
      </div>
    </div>
  );
}

export default SearchBox;
