import credentialProvider from "../config";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    isAdmin: boolean;
  }

  interface Session {
    user: User;
  }

  interface JWT {
    id: string;
    email: string;
    isAdmin: boolean;
  }
}

export const authConfig = {
  providers: [credentialProvider],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      // Check if the user is an admin
      console.log("User:", user);
      if (user && user.isAdmin) {
        return {
          user: { id: user.id, email: user.email, isAdmin: user.isAdmin },
        };
      }
  
    },
    async redirect({ url, baseUrl }: any) {
      return baseUrl;
    },
    async session({ session, token, user }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }: any) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
  },
  pages: {
    signIn: "/",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
