import credentialsProvider from "../config";

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
  providers: [credentialsProvider],
  callbacks: {
    // Called when user signs in
    async signIn({ user }: any) {
      if (!user) return false;
      // Allow all users to sign in
      return true;
    },

    // Called after sign in, determines where to redirect
    async redirect({ url, baseUrl }: any) {
      // Allow only local redirects (security)
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;

      return baseUrl;
    },

    // Called to attach user data to session
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },

    // Called when token is created or updated
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
  },

  // Customize sign-in page
  pages: {
    signIn: "/",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
