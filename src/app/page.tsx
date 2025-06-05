import { redirect } from "next/navigation";
import { getSession } from "../features/auth/get-session";
import { UserButton } from "@/features/auth/components/user-button";

export default async function Home() {
  const auth = await getSession();

  if (!auth) redirect("/sign-in");

  return (
    <main>
      <UserButton />
    </main>
  );
}
