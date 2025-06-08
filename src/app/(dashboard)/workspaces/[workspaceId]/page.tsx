import { redirect } from "next/navigation";
import { getSession } from "@/features/auth/get-session";

const WorkspaceIdPage = async () => {
  const auth = await getSession();

  if (!auth?.session) {
    redirect("/sign-in");
  }
  return (
    <div>
      <h1>Workspace ID Page</h1>
      <p>This is the workspace page for a specific workspace.</p>
    </div>
  );
};

export default WorkspaceIdPage;
