import { redirect } from "next/navigation";
import { getSession } from "@/features/auth/get-session";

export default async function Home() {
  const auth = await getSession();

  if (!auth) {
    redirect("/sign-in");
  }

  return <main>This is the dashboard page.</main>;
}
