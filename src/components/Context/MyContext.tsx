"use client";
import { type Task } from "@prisma/client";
import { createContext, useContext, useState } from "react";

interface MyContextProps {
  tasks: Task[];
  refreshData: () => Promise<void>;
  fetchData: (title: string, statusId: number) => Promise<void>;
  loader: boolean;
}

interface ResponseType {
  tasks: Task[];
  message: string;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};

// Create a provider component
export const MyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const refreshData = async () => {
    try {
      const response = await fetch(`/api/task`);
      const data = (await response.json()) as ResponseType;
      if (response.ok) {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error("Error while fetching tasks refreshData():", error);
    }
  };

  const fetchData = async (title: string, statusId: number) => {
    try {
      const queryString = `?statusId=${statusId}&title=${title}`;
      setLoader(true);
      const response = await fetch(`/api/task${queryString}`, {
        cache: "no-cache",
      });
      const data = (await response.json()) as ResponseType;

      if (response.ok) {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error("Error while fetching tasks fetchData():", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <MyContext.Provider value={{ tasks, refreshData, fetchData, loader }}>
      {children}
    </MyContext.Provider>
  );
};
