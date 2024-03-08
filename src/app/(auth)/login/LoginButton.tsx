"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import LoadingDots from "~/components/icons/loading-dots";
import { BsGoogle } from "react-icons/bs";

export default function LoginButton() {
  const [loadingGoogleLogin, setLoadingGoogleLogin] = useState(false);

  // Get error message added by next/auth in URL.
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");


  return (
    <div>
      <button
        disabled={loadingGoogleLogin}
        onClick={() => {
          setLoadingGoogleLogin(true);
          console.log('signing start');
          void signIn("google");
        }}
        className={`${
          loadingGoogleLogin
            ? "cursor-not-allowed bg-stone-50 dark:bg-stone-800"
            : "bg-white hover:bg-stone-50 active:bg-stone-100 dark:bg-black dark:hover:border-white dark:hover:bg-black"
        } group my-2 flex h-10 w-full items-center justify-center space-x-2 rounded-md border border-stone-200 transition-colors duration-75 focus:outline-none dark:border-stone-700`}
      >
        {loadingGoogleLogin ? (
          <LoadingDots color="#A8A29E" />
        ) : (
          <>
            <BsGoogle color="white" />
            <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
              Login with Google
            </p>
          </>
        )}
      </button>
    </div>
  );
}
