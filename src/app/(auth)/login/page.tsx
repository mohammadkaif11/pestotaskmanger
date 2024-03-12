import LoginButton from "./LoginButton";
import { Suspense } from "react";


export default async function LoginPage() {
  return (
    <div className="mx-5 border border-black  py-10 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:shadow-md ">
      <h4 className="text-2xl text-center font-bold text-gray-500">PestoTaskManger</h4>
      <h1 className="font-cal mt-6 text-center text-3xl text-gray-400">
        Welcome to Pesto TaskManger!
      </h1>
      <p className="mb-8 mt-2 text-center text-sm text-gray-400">
        Mange daily task with Pesto task manger
      </p>
      <div className="mx-auto mt-4 w-11/12 max-w-xs sm:w-full">
        <Suspense
          fallback={
            <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
          }
        >
          <LoginButton />
        </Suspense>
      </div>
    </div>
  );
}
