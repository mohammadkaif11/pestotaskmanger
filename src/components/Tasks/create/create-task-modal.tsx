import React from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { toast } from "sonner";
import Loader from "../../icons/loader";
import { type ResponseType,type ErrorMessageInterface } from "model";
import { useMyContext } from "~/components/Context/MyContext";


function CreateTaskModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [loading, setloading] = useState(false);
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const { refreshData } = useMyContext();

  async function handleCreate() {
    setloading(true);
    try {
      if (Title.trim() === "" || Description.trim() === "") {
        throw new Error("Title and Description cannot be empty");
      }
      const response = await fetch("/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Title, Description }),
      });
      if (!response.ok) {
        throw new Error("Failed to Create task");
      }
      const jsonResponse = (await response.json()) as ResponseType;
      if (jsonResponse.error) {
        throw new Error(jsonResponse.error);
      }
      refreshData().catch((error) => {
        console.error("Error while fetching task in promise", error);
      });
      toast.success(jsonResponse.message);
    } catch (error: unknown) {
      const Error: ErrorMessageInterface = {
        message: (error as Error).message || "Internal Server Error",
      };
      toast.error(Error.message);
      console.error("Error while creating Task:", error);
    } finally {
      setOpen(false);
      setloading(false);
      setTitle("");
      setDescription("");
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 flex flex-col gap-x-2 gap-y-2">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Create Task
                  </Dialog.Title>
                  <div className="flex flex-col gap-2">
                    <div>
                      <label
                        htmlFor="Title"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        value={Title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-2 w-[100%] rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="Description"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        value={Description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-2 w-[100%] rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={handleCreate}
                  >
                    {loading ? <Loader /> : "Create"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default CreateTaskModal;
