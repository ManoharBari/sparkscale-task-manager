import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcryptjs";

export default CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "email", placeholder: "john@gmail.com" },
    password: { label: "Password", type: "password" },
  },

  async authorize(credentials, req) {
    const user = await prisma.user.findUnique({
      where: {
        email: credentials?.email,
      },
    });

    if (user) {
      const isPasswordValid = await bcrypt.compare(
        credentials?.password || "",
        user.password
      );

      if (isPasswordValid) {
        return {
          id: user.id,
          email: user.email,
          isAdmin: user.isAdmin,
        };
      } else {
        return null;
      }
    } else {
      if (!credentials?.password) {
        throw new Error("Password is required for new users");
      }

      return null;
    }
  },
});
