import Link from "next/link";
import CreateTaskModalButton from "~/components/Tasks/create/create-task-modal-button";
import Navbar from "~/components/navbar/navbar";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import TaskCard from "~/components/Tasks/TaskCard/task-card";

export default async function HomePage() {
  const sessions = await getServerAuthSession();
  if (!sessions?.user?.id) {
    redirect("/login");
  }
  const tasks = await db.task.findMany({ where: { userId: sessions.user.id } });
  return (
    <main>
      <Navbar />
      <div className="container m-2">
        <CreateTaskModalButton></CreateTaskModalButton>
      </div>
      <div className=" grid justify-items-center gap-4 sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3">
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
    </main>
  );
}
