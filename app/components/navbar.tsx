"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Brain, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { spec } from "node:test/reporters";
import PrivateRoute from "../api/auth/[...nextauth]/Privateroute/Privateroute";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    href: "/dashboard",
    label: "DashBoard",
    special: true,
  },
  {
    href: "/Quizzes",
    label: "Quiz",
    special: true,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const [position, setPosition] = React.useState("dashboard");
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  const handleSignOut = async () => {
    await signOut();
    router.push("/auth/signin"); // Redirect to login page after sign out
  };

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false); // Hides navbar when scrolling down
      } else {
        setIsVisible(true); // Shows navbar when scrolling up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 `}>
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 pl-2 md:pl-0">
          <Brain className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Quizmania</span>
        </Link>

        {/* Desktop Navigationn */}
        <nav className="hidden md:flex md:gap-6">
          {routes.map((route) =>
            route.special ? (
              route.href != "/dashboard" && (
                <PrivateRoute key={route.href}>
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      pathname === route.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}>
                    {route.label}
                  </Link>
                </PrivateRoute>
              )
            ) : (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === route.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}>
                {route.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden md:flex md:items-center md:gap-4">
          <ThemeToggle />
          {session?.user ? (
            <div className="flex gap-3 justify-center items-center cursor-pointer">
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                  <Button variant="outline">
                    <Avatar>
                      <AvatarImage
                        className="object-cover"
                        src={session?.user?.image as string}
                        alt="userphoto"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 shadow-[0px_0px_5px_0px_#8B5CF6] mt-2 ">
                  <DropdownMenuLabel className="capitalize">
                    {session?.user?.name}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={position}
                    onValueChange={setPosition}>
                    <DropdownMenuRadioItem
                      className="cursor-pointer"
                      value="dashboard">
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <button
                onClick={handleSignOut}
                className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-md">
                Log Out
              </button>
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-md">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        {/* <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 pt-6 px-4">
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
        </Sheet> */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <VisuallyHidden>
              <DialogTitle>Navigation Menu</DialogTitle>
            </VisuallyHidden>
            <motion.div
              initial={{ y: "100%", borderRadius: "0%" }} // Initially from the bottom and square shape
              animate={{ y: 0, borderRadius: "16px" }} // Move to the normal position and round shape
              exit={{ y: "100%", borderRadius: "0%" }} // Exit back to the bottom with square shape
              transition={{ type: "spring", stiffness: 120 }}
              className="flex flex-col gap-6 pt-6 px-4">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setIsOpen(false)}>
                <Brain className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Quizmania</span>
              </Link>
              <nav className="flex flex-col gap-4">
                {routes.map((route) =>
                  route.special ? (
                    <PrivateRoute key={route.href}>
                      <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                          "text-sm font-medium transition-colors hover:text-primary",
                          pathname === route.href
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
                        onClick={() => setIsOpen(false)}>
                        {route.label}
                      </Link>
                    </PrivateRoute>
                  ) : (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        pathname === route.href
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                      onClick={() => setIsOpen(false)}>
                      {route.label}
                    </Link>
                  )
                )}
                <div className="flex items-center gap-2 pt-2 w-full">
                  <ThemeToggle />
                  <span className="text-sm">Toggle theme</span>
                </div>
                {session?.user ? (
                  <div>
                    <div className="flex items-center gap-3 py-2 ">
                      <Avatar>
                        <AvatarImage
                          src={session?.user?.image as string}
                          alt="userphoto"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <p>{session.user.email}</p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-md w-full">
                      Log Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/auth/signin"
                    className="mt-2"
                    onClick={() => setIsOpen(false)}>
                    <button className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-md w-full">
                      Login
                    </button>
                  </Link>
                )}
              </nav>
            </motion.div>
          </SheetContent>
        </Sheet>

        {/* Mobile Navigation */}
        {/* <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <motion.div
              initial={{ y: "100%" }} // Initially from the bottom of the screen
              animate={{ y: 0 }} // Animate to the normal position (top)
              exit={{ y: "100%" }} // Exit back to the bottom of the screen
              transition={{ type: "spring", stiffness: 120 }}
              className="flex flex-col gap-6 pt-6 px-4"
            >
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
                <Button className="mt-2" onClick={() => setIsOpen(false)}>
                  Login
                </Button>
              </nav>
            </motion.div>
          </SheetContent>
        </Sheet> */}
      </div>
    </header>
  );
}
