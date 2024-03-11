import Navbar from "~/components/navbar/navbar";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import SearchBox from "~/components/navbar/SearchBox";

export default async function HomePage() {
  const sessions = await getServerAuthSession();
  if (!sessions?.user?.id) {
    redirect("/login");
  }
  return (
    <main>
      <Navbar />
      <SearchBox />
    </main>
  );
}
