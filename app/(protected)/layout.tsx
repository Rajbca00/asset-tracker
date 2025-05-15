import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const session = await getServerSession();

  if (!session) {
    return redirect("/");
  }
  return <>{children}</>;
};

export default ProtectedLayout;
