import { cookies } from "next/headers";

export const getSession = async () => {
  const cookie = await cookies();
  const session = cookie.has(process.env.AUTH_COOKIE!);
  console.log("getAuth session:", session);
  if (!session) return null;
  return session;
};
