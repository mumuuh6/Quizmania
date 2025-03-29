"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const routes = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/contact",
    label: "Contact",
  },
  {
    href: "/Quizzes",
    label: "Quiz",
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: session } = useSession();

  console.log(session);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Quizmania</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === route.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex md:items-center md:gap-4">
          <ThemeToggle />
          {session ? (
            <button
              onClick={handleSignOut}
              className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-md"
            >
              Log Out
            </button>
          ) : (
            <Link
              href="/auth/signin"
              className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-md"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 pt-6">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <Brain className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Quizmania</span>
              </Link>
              <nav className="flex flex-col gap-4">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      pathname === route.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {route.label}
                  </Link>
                ))}
                <div className="flex items-center gap-2 pt-2">
                  <ThemeToggle />
                  <span className="text-sm">Toggle theme</span>
                </div>

                <Link
                  href="/auth/signin"
                  className="mt-2"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
