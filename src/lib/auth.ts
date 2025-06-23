// lib/auth.ts
import { getServerSession } from "next-auth";
import { authConfig } from "@/src/app/api/auth/[...nextauth]/config";
import { prisma } from "@/src/lib/prisma"; // your database instance

export async function getCurrentUser() {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      email: true,
      isAdmin: true,
      createdAt: true,
      joiningDate: true,
      resignationDate: true,
      weekOff: true,
      deleted: true,
      tasks: { select: { id: true } },
      projectsOwned: { select: { id: true } },
    },
  });

  if (!user) return null;

  return {
    ...user,
    tasksCount: user.tasks.length,
    projectsOwnedCount: user.projectsOwned.length,
  };
}
