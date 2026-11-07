import bcrypt from "bcryptjs";

import { prisma } from "../src/lib/db";

async function seedAdmin() {
  const email = "info@moryatravel.in";
  const passwordHash = await bcrypt.hash("admin123", 10);

  await prisma.admin.upsert({
    where: { email },
    update: { passwordHash, name: "Morya Admin" },
    create: {
      email,
      passwordHash,
      name: "Morya Admin",
      role: "admin",
    },
  });

  console.log("Admin seeded successfully");
}

seedAdmin().catch((error) => {
  console.error(error);
  process.exit(1);
});
