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
// import { SessionProvider } from "next-auth/react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <CheckSquare className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">TaskMaster</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Sign up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Manage Tasks with Ease and Efficiency
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  TaskMaster helps teams organize, track, and manage their work
                  in one collaborative space.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="/login">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[500px] aspect-video overflow-hidden rounded-xl border bg-background shadow-xl">
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
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Everything You Need
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                TaskMaster provides all the tools you need to manage projects
                and tasks efficiently.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Task Management</h3>
              <p className="text-center text-muted-foreground">
                Create, assign, and track tasks with ease. Set priorities and
                deadlines.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Team Collaboration</h3>
              <p className="text-center text-muted-foreground">
                Work together seamlessly with your team members on projects and
                tasks.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Analytics & Reporting</h3>
              <p className="text-center text-muted-foreground">
                Get insights into your team's performance and project progress.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Project Timeline</h3>
              <p className="text-center text-muted-foreground">
                Visualize project schedules and track progress against
                deadlines.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Task Comments</h3>
              <p className="text-center text-muted-foreground">
                Discuss tasks with team members and keep all communication in
                one place.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Notifications</h3>
              <p className="text-center text-muted-foreground">
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
        className="w-full py-12 md:py-24 lg:py-32 bg-muted"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                Testimonials
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                What Our Users Say
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Don't just take our word for it. Here's what our customers have
                to say about TaskMaster.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  "TaskMaster has transformed how our team works. We're more
                  organized and productive than ever before."
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
                  <p className="text-sm font-medium">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">
                    Project Manager, Acme Inc
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
              <div className="space-y-4">
                <p className="text-muted-foreground">
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
                  <p className="text-sm text-muted-foreground">
                    CTO, TechStart
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
              <div className="space-y-4">
                <p className="text-muted-foreground">
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
                  <p className="text-sm text-muted-foreground">
                    Team Lead, Global Solutions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                Pricing
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Simple, Transparent Pricing
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the plan that's right for your team. All plans include a
                14-day free trial.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Starter</h3>
                <p className="text-muted-foreground">
                  Perfect for small teams just getting started.
                </p>
              </div>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold">$9</span>
                <span className="ml-1 text-muted-foreground">
                  /month per user
                </span>
              </div>
              <ul className="mt-6 space-y-2">
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Up to 10 team members</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Basic task management</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>5 projects</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Basic reporting</span>
                </li>
              </ul>
              <Button className="mt-6" asChild>
                <Link href="/login">Get Started</Link>
              </Button>
            </div>
            <div className="flex flex-col rounded-lg border bg-primary p-6 shadow-sm">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-primary-foreground">
                  Professional
                </h3>
                <p className="text-primary-foreground/80">
                  Ideal for growing teams with more needs.
                </p>
              </div>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold text-primary-foreground">
                  $19
                </span>
                <span className="ml-1 text-primary-foreground/80">
                  /month per user
                </span>
              </div>
              <ul className="mt-6 space-y-2">
                <li className="flex items-center text-primary-foreground">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  <span>Unlimited team members</span>
                </li>
                <li className="flex items-center text-primary-foreground">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  <span>Advanced task management</span>
                </li>
                <li className="flex items-center text-primary-foreground">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  <span>Unlimited projects</span>
                </li>
                <li className="flex items-center text-primary-foreground">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center text-primary-foreground">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Button
                className="mt-6 bg-background text-primary hover:bg-background/90"
                asChild
              >
                <Link href="/login">Get Started</Link>
              </Button>
            </div>
            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Enterprise</h3>
                <p className="text-muted-foreground">
                  For large organizations with complex needs.
                </p>
              </div>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold">$49</span>
                <span className="ml-1 text-muted-foreground">
                  /month per user
                </span>
              </div>
              <ul className="mt-6 space-y-2">
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Everything in Professional</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>24/7 premium support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Advanced security features</span>
                </li>
              </ul>
              <Button className="mt-6" asChild>
                <Link href="/login">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Get Started?
              </h2>
              <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
                Join thousands of teams already using TaskMaster to improve
                their productivity.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/login">
                  Sign Up Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground"
              >
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckSquare className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">TaskMaster</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Simplifying task management for teams of all sizes since 2023.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:underline"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:underline"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:underline"
                  >
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:underline"
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
                    className="text-muted-foreground hover:underline"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:underline"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:underline"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:underline"
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
                    className="text-muted-foreground hover:underline"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:underline"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:underline"
                  >
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:underline"
                  >
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} TaskMaster. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
