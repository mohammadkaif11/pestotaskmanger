import { type Metadata } from "next";
import { type ReactNode } from "react";

export const metadata: Metadata = {
  title: "Login With PestoTaskMangement ",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-emerald-50 py-12 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
