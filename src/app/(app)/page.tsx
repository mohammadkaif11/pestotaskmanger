import Link from "next/link";
import CreateTaskModalButton from "~/components/Tasks/create/create-task-modal-button";
import Navbar from "~/components/navbar/navbar";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import TaskCard from "~/components/Tasks/TaskCard/task-card";
import SearchBox from "~/components/navbar/SearchBox";
import GetTask from "~/components/Tasks/get-all-task-components";

export default async function HomePage() {
  const sessions = await getServerAuthSession();
  if (!sessions?.user?.id) {
    redirect("/login");
  }
  return (
    <main>
      <Navbar />
      <SearchBox />
      <GetTask/>
    </main>
  );
}
