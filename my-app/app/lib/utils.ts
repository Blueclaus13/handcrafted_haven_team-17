"use client";
import { useSession } from "next-auth/react";

export function getUserID() {
  const { data: session, status: sessionStatus } = useSession();

  return session?.user.id;
}
