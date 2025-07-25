"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { CheckSquare } from "lucide-react";

const LoginPage = () => {
  // const { data: session, status, update } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();

      if (session?.user?.isAdmin) {
        router.push("/admin");
      } else {
        router.push("/user-dashboard");
      }

      toast.success("Logged in successfully");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#1A1A2E] text-white">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <Link href="/" className="mb-8 flex items-center gap-2">
          <CheckSquare className="h-6 w-6 text-[#FFD700]" />{" "}
          {/* Accent color */}
          <span className="text-xl font-bold">TaskMaster</span>
        </Link>
        <div className="w-full max-w-md space-y-8 rounded-lg border border-gray-700 bg-[#28283E] p-6 shadow-lg">
          {" "}
          {/* Darker background, border, and default text */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-gray-400">
              {" "}
              {/* Muted text */}
              Enter your credentials to access your account
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>{" "}
            {/* White label */}
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading} // Disable input when loading
              required // Basic HTML5 validation
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400" // Dark input styling
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>{" "}
              {/* White label */}
              <Link
                href="/forgot-password"
                className="text-sm text-[#FFD700] hover:underline"
              >
                {" "}
                {/* Accent color link */}
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading} // Disable input when loading
              required // Basic HTML5 validation
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400" // Dark input styling
            />
          </div>
          <Button
            onClick={handleLogin}
            className="w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90" // Accent button
            type="submit" // Set type to submit
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
