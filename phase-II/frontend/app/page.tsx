"use client";

import Link from "next/link";
import { useAuth, type User } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";
import { useState, useEffect } from "react";
import {
  CheckCircle2,
  Zap,
  Shield,
  Users,
  ChevronDown,
  LogOut,
  User as UserIcon,
  Play,
  ArrowRight,
  Layout,
} from "lucide-react";

// --- Types & Variants ---

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// --- Sub-components ---

function DemoTask({
  text,
  checked,
  index,
}: {
  text: string;
  checked: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 + 0.5 }}
      className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-lg shadow-sm mb-3"
    >
      <div
        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
          checked ? "bg-blue-500 border-blue-500" : "border-gray-300"
        }`}
      >
        {checked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
      </div>
      <div
        className={`flex-1 text-sm ${
          checked ? "text-gray-400 line-through" : "text-gray-700 font-medium"
        }`}
      >
        {text}
      </div>
      <div
        className={`w-2 h-2 rounded-full ${
          checked ? "bg-gray-200" : "bg-blue-200"
        }`}
      />
    </motion.div>
  );
}

function ProfileDropdown({ user, logout }: { user: User; logout: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
      >
        <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-500 to-violet-500 flex items-center justify-center text-white font-medium text-sm shadow-md">
          {user?.name?.[0] || user?.email?.[0] || "U"}
        </div>
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          {user?.name || user?.email?.split("@")[0]}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-1"
          >
            <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                Signed in as
              </p>
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.email}
              </p>
            </div>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
            >
              <Layout className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
            >
              <UserIcon className="w-4 h-4" />
              Profile
            </Link>
            <div className="h-px bg-gray-100 my-1" />
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Log out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Main Page Component ---

export default function Home() {
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;

  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-xs"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-blue-500/30 transition-shadow">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-slate-900 to-slate-700">
                TodoFlow
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {["Features", "Updates", "Pricing", "About"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Auth Actions */}
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <ProfileDropdown user={user} logout={logout} />
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    href="/login"
                    className="hidden sm:block text-sm font-medium text-slate-600 hover:text-slate-900"
                  >
                    Log in
                  </Link>
                  <Link href="/signup">
                    <Button className="rounded-full bg-slate-900 hover:bg-slate-800 text-white px-6">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-linear-to-b from-blue-50 to-transparent opacity-60" />
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-indigo-200/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute top-20 -left-20 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-6"
            >
              <Zap className="w-4 h-4 fill-blue-600" />
              <span>New: AI-Powered Task Sorting</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6"
            >
              Organize your work, <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-violet-600">
                amplify your flow.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              TodoFlow helps you manage tasks, collaborate with your team, and
              reach new productivity peaks with a beautifully simple interface.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/signup">
                <Button
                  size="lg"
                  className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 hover:shadow-blue-600/30 transition-all hover:scale-105"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 text-lg rounded-full border-gray-200 hover:bg-gray-50 hover:text-slate-900 transition-all hidden sm:flex"
              >
                <Play className="mr-2 w-5 h-5 fill-current" />
                Watch Demo
              </Button>
            </motion.div>
          </div>

          {/* Visual Demo Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative max-w-5xl mx-auto"
          >
            <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-violet-500 rounded-2xl opacity-20 blur-xl" />
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden aspect-video md:aspect-video flex flex-col">
              {/* Fake Browser Toolbar */}
              <div className="h-10 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-6 w-full max-w-md bg-white border border-gray-200 rounded-md mx-auto opacity-50" />
                </div>
              </div>

              {/* App UI */}
              <div className="flex-1 flex bg-white overflow-hidden">
                {/* Sidebar */}
                <div className="w-48 bg-gray-50 border-r border-gray-100 p-4 hidden sm:block">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="h-8 bg-blue-100 rounded-md w-full" />
                      <div className="h-8 bg-transparent rounded-md w-full" />
                      <div className="h-8 bg-transparent rounded-md w-full" />
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <div className="h-4 bg-gray-200 rounded w-20 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-24" />
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6 sm:p-8 bg-white relative">
                  <div className="mb-6 flex justify-between items-center">
                    <div>
                      <div className="h-8 w-48 bg-gray-900 rounded-md mb-2" />
                      <div className="h-4 w-64 bg-gray-200 rounded-md" />
                    </div>
                    <div className="h-10 w-32 bg-blue-600 rounded-full hidden sm:block" />
                  </div>

                  <div className="space-y-2">
                    <DemoTask
                      index={0}
                      text="Review Q4 marketing goals"
                      checked={true}
                    />
                    <DemoTask
                      index={1}
                      text="Update landing page copy"
                      checked={false}
                    />
                    <DemoTask
                      index={2}
                      text="Sync with design team"
                      checked={false}
                    />
                    <DemoTask
                      index={3}
                      text="Prepare weekly metrics report"
                      checked={false}
                    />
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="absolute bottom-8 right-8 p-4 bg-white rounded-xl shadow-xl border border-gray-100 w-48 z-10 hidden md:block"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">Status</div>
                        <div className="text-sm font-semibold text-gray-900">
                          Completed
                        </div>
                      </div>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-full" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase mb-2">
              Powerful Features
            </h2>
            <p className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything you need to{" "}
              <span className="text-blue-600">ship faster.</span>
            </p>
            <p className="text-lg text-slate-600">
              Built for teams who want to spend less time managing and more time
              doing.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Zap className="w-6 h-6 text-amber-500" />,
                title: "Lightning Fast",
                desc: "Optimized for speed with instant updates and offline support.",
              },
              {
                icon: <Shield className="w-6 h-6 text-blue-500" />,
                title: "Bank-Grade Security",
                desc: "Your data is encrypted at rest and in transit. Safe and sound.",
              },
              {
                icon: <Users className="w-6 h-6 text-violet-500" />,
                title: "Team Collaboration",
                desc: "Share projects, assign tasks, and chat in real-time.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-100 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-sm mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-slate-900/50" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Ready to organize your life?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto"
          >
            Join over 10,000+ happy users and start managing your tasks the
            right way. Free 14-day trial, no credit card required.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/signup">
              <Button
                size="lg"
                className="h-14 px-8 text-lg rounded-full bg-white text-slate-900 hover:bg-gray-100 font-bold transition-all hover:scale-105"
              >
                Get Started Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-gray-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="text-lg font-bold text-slate-900">
                  TodoFlow
                </span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Making the world more productive, one task at a time. Designed
                by the TodoFlow Team.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © 2026 TodoFlow Inc. All rights reserved.
            </p>
            <div className="flex gap-4">
              {/* Social Icons */}
              <div className="w-5 h-5 bg-slate-200 rounded-full" />
              <div className="w-5 h-5 bg-slate-200 rounded-full" />
              <div className="w-5 h-5 bg-slate-200 rounded-full" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
