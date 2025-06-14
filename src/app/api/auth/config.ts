import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcryptjs";

export default CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: {
      label: "Email",
      type: "email",
      placeholder: "john@gmail.com",
    },
    password: {
      label: "Password",
      type: "password",
    },
  },

  async authorize(credentials) {
    // Step 1: Check for missing credentials
    const { email, password } = credentials || {};
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Step 2: Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("No user found with this email");
    }

    // Step 3: Compare provided password with hashed password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Invalid password");
    }

    // Step 4: Return safe user object (no password)
    return {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };
  },
});
