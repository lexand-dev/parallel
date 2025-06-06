import { redirect } from "next/navigation";
import { getSession } from "@/features/auth/get-session";
import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form";

export default async function Home() {
  const auth = await getSession();

  if (!auth) {
    redirect("/sign-in");
  }

  return (
    <main>
      <CreateWorkspaceForm />
    </main>
  );
}
