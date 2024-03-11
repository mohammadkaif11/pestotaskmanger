"use client";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import DeleteSceneModal from "../delete/delete-scene-modal";
import EditSceneModal from "../update/update-scene-modal";
import { useMyContext } from "~/components/Context/MyContext";

interface ResponseType {
  message: string;
}
function TaskCard({
  id,
  title,
  description,
  status,
}: {
  id: string;
  title: string;
  description: string;
  status: number;
}) {
  const [statusId, setStatusId] = useState(status);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { refreshData } = useMyContext();

  useEffect(() => {
    // Component is mounted
    setIsMounted(true);

    // Cleanup function to set isMounted to false when the component is unmounted
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    // Avoid the initial update when the component is mounted
    if (isMounted) {
      updateStatus().catch((err) => {
        console.error(err);
      });
    }
  }, [statusId]);

  async function updateStatus() {
    try {
      const response = await fetch("/api/task-status-update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, statusId }),
      });

      if (!response.ok) {
        throw new Error("Failed to Update Task");
      }
      const jsonResponse = (await response.json()) as ResponseType;
      toast.success(jsonResponse.message);
      refreshData().catch((error) => {
        console.error("Error while fetching task", error);
      });
    } catch (error: unknown) {
      const Error: ResponseType = {
        message: (error as Error).message || "Internal Server Error",
      };
      toast.error(Error.message);
      console.error("Error while updating Task Status:", error);
    }
  }

  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
      <select
        id="countries"
        defaultValue={statusId}
        value={statusId}
        onChange={(e) => {
          setStatusId(Number(e.target.value));
        }}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        <option value="1">Pending</option>
        <option value="2">InProgress</option>
        <option value="3">Done</option>
      </select>
      <div className="m-2 flex gap-2">
        <TrashIcon
          className="h-4 w-4 text-white"
          onClick={() => {
            setDeleteModal(true);
          }}
        />
        <PencilSquareIcon
          className="h-4 w-4 text-white"
          onClick={() => {
            setUpdateModal(true);
          }}
        />
      </div>
      <DeleteSceneModal
        taskId={id}
        open={deleteModal}
        setOpen={setDeleteModal}
      />
      <EditSceneModal
        taskId={id}
        taskDescription={description}
        taskTitle={title}
        open={updateModal}
        setOpen={setUpdateModal}
      />
    </div>
  );
}

export default TaskCard;
