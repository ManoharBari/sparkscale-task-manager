// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create users
  const user1 = await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: hashedPassword,
      isAdmin: true,
      weekOff: ["Saturday", "Sunday"],
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "user@example.com",
      password: hashedPassword,
      weekOff: ["Sunday"],
    },
  });

  // Create project
  const project = await prisma.project.create({
    data: {
      name: "Project Alpha",
      ownerId: user1.id,
      type: "EXTERNAL",
      startDate: new Date(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days later
      status: "ONGOING",
    },
  });

  // Create task
  await prisma.task.create({
    data: {
      name: "Initial Setup",
      description: "Set up project repo and CI/CD",
      projectId: project.id,
      assignedToId: user2.id,
      startDate: new Date(),
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days later
      status: "NEW",
    },
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Error during seeding", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
