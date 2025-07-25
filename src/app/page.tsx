import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
  CheckCircle2,
  Users,
  BarChart3,
  Calendar,
  ArrowRight,
  CheckSquare,
  MessageSquare,
  Bell,
} from "lucide-react";
// import { SessionProvider } from "next-auth/react"; // Uncomment if you use NextAuth

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1A1A2E] text-white">
      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-gray-700 bg-[#1A1A2E]">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <CheckSquare className="h-6 w-6 text-[#FFD700]" />{" "}
            {/* Accent color */}
            <span className="text-xl font-bold text-white">
              TaskMaster
            </span>{" "}
            {/* Explicit white text */}
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-gray-300 hover:text-white hover:underline underline-offset-4" // Muted link, highlights white on hover
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-gray-300 hover:text-white hover:underline underline-offset-4"
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-gray-300 hover:text-white hover:underline underline-offset-4"
            >
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90">
              <Link href="/login">Log in</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-[#1A1A2E] to-[#28283E]">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Manage Tasks with Ease and Efficiency
                </h1>
                <p className="max-w-[600px] text-gray-300 md:text-xl">
                  TaskMaster helps teams organize, track, and manage their work
                  in one collaborative space.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90"
                >
                  {/* FIX: Wrap multiple children inside Link with a span */}
                  <Link href="/login">
                    <span className="flex items-center">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-700 text-black hover:bg-white"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[500px] aspect-video overflow-hidden rounded-xl border border-gray-700 bg-[#1A1A2E] shadow-xl">
                {/* Note: The image URL was corrected in a previous turn */}
                <img
                  src="https://i.ibb.co/CpnWQYSt/Screenshot-2025-06-23-215037.png"
                  alt="Dashboard Preview"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="w-full py-12 md:py-24 lg:py-32 bg-[#1A1A2E]"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-[#FFD700] px-3 py-1 text-sm text-black">
                {" "}
                {/* Accent background, black text */}
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                Everything You Need
              </h2>
              <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                TaskMaster provides all the tools you need to manage projects
                and tasks efficiently.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {/* Feature Cards */}
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-700 p-6 shadow-sm bg-[#28283E] text-white">
              {" "}
              {/* Card background, white text */}
              <div className="rounded-full bg-[#FFD700]/10 p-3">
                {" "}
                {/* Light accent tint */}
                <CheckCircle2 className="h-6 w-6 text-[#FFD700]" />{" "}
                {/* Accent icon */}
              </div>
              <h3 className="text-xl font-bold">Task Management</h3>
              <p className="text-center text-gray-400">
                {" "}
                {/* Muted text for description */}
                Create, assign, and track tasks with ease. Set priorities and
                deadlines.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-700 p-6 shadow-sm bg-[#28283E] text-white">
              <div className="rounded-full bg-[#FFD700]/10 p-3">
                <Users className="h-6 w-6 text-[#FFD700]" />
              </div>
              <h3 className="text-xl font-bold">Team Collaboration</h3>
              <p className="text-center text-gray-400">
                Work together seamlessly with your team members on projects and
                tasks.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-700 p-6 shadow-sm bg-[#28283E] text-white">
              <div className="rounded-full bg-[#FFD700]/10 p-3">
                <BarChart3 className="h-6 w-6 text-[#FFD700]" />
              </div>
              <h3 className="text-xl font-bold">Analytics & Reporting</h3>
              <p className="text-center text-gray-400">
                Get insights into your team's performance and project progress.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-700 p-6 shadow-sm bg-[#28283E] text-white">
              <div className="rounded-full bg-[#FFD700]/10 p-3">
                <Calendar className="h-6 w-6 text-[#FFD700]" />
              </div>
              <h3 className="text-xl font-bold">Project Timeline</h3>
              <p className="text-center text-gray-400">
                Visualize project schedules and track progress against
                deadlines.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-700 p-6 shadow-sm bg-[#28283E] text-white">
              <div className="rounded-full bg-[#FFD700]/10 p-3">
                <MessageSquare className="h-6 w-6 text-[#FFD700]" />
              </div>
              <h3 className="text-xl font-bold">Task Comments</h3>
              <p className="text-center text-gray-400">
                Discuss tasks with team members and keep all communication in
                one place.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-700 p-6 shadow-sm bg-[#28283E] text-white">
              <div className="rounded-full bg-[#FFD700]/10 p-3">
                <Bell className="h-6 w-6 text-[#FFD700]" />
              </div>
              <h3 className="text-xl font-bold">Notifications</h3>
              <p className="text-center text-gray-400">
                Stay updated with real-time notifications about task changes and
                updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="w-full py-12 md:py-24 lg:py-32 bg-[#28283E]" // Secondary dark background for contrast
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-[#FFD700] px-3 py-1 text-sm text-black">
                Testimonials
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                What Our Users Say
              </h2>
              <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Don't just take our word for it. Here's what our customers have
                to say about TaskMaster.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {/* Testimonial Cards */}
            <div className="flex flex-col justify-between rounded-lg border border-gray-700 bg-[#1A1A2E] p-6 shadow-sm text-white">
              <div className="space-y-4">
                <p className="text-gray-400">
                  "TaskMaster has transformed how our team works. We're more
                  organized and productive than ever before."
                </p>
              </div>
              <div className="flex items-center space-x-4 pt-4">
                {/* Placeholder images for users. Consider using actual user avatars or colored placeholders */}
                <img
                  src="/placeholder.svg?height=40&width=40" // Ensure this path is correct or replace with a real image
                  className="rounded-full"
                  height="40"
                  width="40"
                  alt="User"
                />
                <div>
                  <p className="text-sm font-medium">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">
                    {" "}
                    {/* Slightly more muted for secondary info */}
                    Project Manager, Acme Inc
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-lg border border-gray-700 bg-[#1A1A2E] p-6 shadow-sm text-white">
              <div className="space-y-4">
                <p className="text-gray-400">
                  "The analytics features have given us incredible insights into
                  our team's performance and bottlenecks."
                </p>
              </div>
              <div className="flex items-center space-x-4 pt-4">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  className="rounded-full"
                  height="40"
                  width="40"
                  alt="User"
                />
                <div>
                  <p className="text-sm font-medium">Michael Chen</p>
                  <p className="text-sm text-gray-500">CTO, TechStart</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-lg border border-gray-700 bg-[#1A1A2E] p-6 shadow-sm text-white">
              <div className="space-y-4">
                <p className="text-gray-400">
                  "Easy to use and incredibly powerful. TaskMaster has become an
                  essential tool for our daily operations."
                </p>
              </div>
              <div className="flex items-center space-x-4 pt-4">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  className="rounded-full"
                  height="40"
                  width="40"
                  alt="User"
                />
                <div>
                  <p className="text-sm font-medium">Emily Rodriguez</p>
                  <p className="text-sm text-gray-500">
                    Team Lead, Global Solutions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="w-full py-12 md:py-24 lg:py-32 bg-[#1A1A2E]"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-[#FFD700] px-3 py-1 text-sm text-black">
                Pricing
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                Simple, Transparent Pricing
              </h2>
              <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the plan that's right for your team. All plans include a
                14-day free trial.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
            {/* Starter Plan */}
            <div className="flex flex-col rounded-lg border border-gray-700 bg-[#28283E] p-6 shadow-sm text-white">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Starter</h3>
                <p className="text-gray-400">
                  Perfect for small teams just getting started.
                </p>
              </div>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold">$9</span>
                <span className="ml-1 text-gray-400">/month per user</span>
              </div>
              <ul className="mt-6 space-y-2">
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-[#FFD700]" />
                  <span>Up to 10 team members</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-[#FFD700]" />
                  <span>Basic task management</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-[#FFD700]" />
                  <span>5 projects</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-[#FFD700]" />
                  <span>Basic reporting</span>
                </li>
              </ul>
              <Button className="mt-6 bg-[#FFD700] text-black hover:bg-[#FFD700]/90">
                <Link href="/login">Get Started</Link>
              </Button>
            </div>

            {/* Professional Plan (Highlighted) */}
            <div className="flex flex-col rounded-lg border border-[#FFD700] bg-[#FFD700] p-6 shadow-sm">
              {" "}
              {/* Accent background and border */}
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-black">
                  {" "}
                  {/* Black text on accent */}
                  Professional
                </h3>
                <p className="text-black/80">
                  {" "}
                  {/* Muted black text on accent */}
                  Ideal for growing teams with more needs.
                </p>
              </div>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold text-black">$19</span>
                <span className="ml-1 text-black/80">/month per user</span>
              </div>
              <ul className="mt-6 space-y-2">
                <li className="flex items-center text-black">
                  {" "}
                  {/* Black text on accent */}
                  <CheckCircle2 className="mr-2 h-4 w-4" />{" "}
                  {/* Icon will inherit black color */}
                  <span>Unlimited team members</span>
                </li>
                <li className="flex items-center text-black">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  <span>Advanced task management</span>
                </li>
                <li className="flex items-center text-black">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  <span>Unlimited projects</span>
                </li>
                <li className="flex items-center text-black">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center text-black">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Button
                className="mt-6 bg-[#1A1A2E] text-[#FFD700] hover:bg-[#1A1A2E]/90" // Dark background, yellow text on hover
              >
                <Link href="/login">Get Started</Link>
              </Button>
            </div>

            {/* Enterprise Plan */}
            <div className="flex flex-col rounded-lg border border-gray-700 bg-[#28283E] p-6 shadow-sm text-white">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Enterprise</h3>
                <p className="text-gray-400">
                  For large organizations with complex needs.
                </p>
              </div>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold">$49</span>
                <span className="ml-1 text-gray-400">/month per user</span>
              </div>
              <ul className="mt-6 space-y-2">
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-[#FFD700]" />
                  <span>Everything in Professional</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-[#FFD700]" />
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-[#FFD700]" />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-[#FFD700]" />
                  <span>24/7 premium support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-[#FFD700]" />
                  <span>Advanced security features</span>
                </li>
              </ul>
              <Button className="mt-6 bg-[#FFD700] text-black hover:bg-[#FFD700]/90">
                <Link href="/login">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-[#FFD700] text-black">
        {" "}
        {/* Accent background, black text */}
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Get Started?
              </h2>
              <p className="mx-auto max-w-[700px] text-black/80 md:text-xl">
                {" "}
                {/* Muted black text */}
                Join thousands of teams already using TaskMaster to improve
                their productivity.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-black hover:bg-gray-100"
              >
                {" "}
                {/* White button on yellow background */}
                {/* FIX: Wrap multiple children inside Link with a span */}
                <Link href="/login">
                  <span className="flex items-center">
                    Sign Up Now <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-black/20 text-black hover:bg-black/10" // Subtle black border and text, slightly darker hover
              >
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-gray-700 py-6 md:py-12 bg-[#1A1A2E] text-white">
        {" "}
        {/* Footer background and text */}
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckSquare className="h-6 w-6 text-[#FFD700]" />
                <span className="text-lg font-bold">TaskMaster</span>
              </div>
              <p className="text-sm text-gray-400">
                {" "}
                {/* Muted text */}
                Simplifying task management for teams of all sizes since 2023.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white hover:underline" // Muted link, highlights white on hover
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white hover:underline"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white hover:underline"
                  >
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white hover:underline"
                  >
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white hover:underline"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white hover:underline"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white hover:underline"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white hover:underline"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white hover:underline"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white hover:underline"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white hover:underline"
                  >
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white hover:underline"
                  >
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} TaskMaster. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
