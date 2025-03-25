"use client"; // Add this to make the component a client component

import Link from "next/link";
import { Github, Twitter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react"; // make sure to import signIn from NextAuth.js

import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Signin() {
  const router = useRouter();
  const { data: session } = useSession();

  // stored user info in the database
  const handleGoogleSignIn = async () => {
    const userInfo = {
      username: session?.user?.name,
      email: session?.user?.email,
      picture: session?.user?.image,
    };

    try {
      await signIn("google");
      const response = await axios.post(
        "http://localhost:5000/signup",
        userInfo
      );
      console.log(response.data);
      if (response.status === 200) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };
  const handleGithubSignIn = async () => {
    const userInfo = {
      email: session?.user?.email,
      picture: session?.user?.image,
    };

    console.log(userInfo);

    try {
      await signIn("github");
      const response = await axios.post(
        "http://localhost:5000/signup",
        userInfo
      );
      console.log(response.data);
      if (response.status === 200) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error signing in with Github:", error);
    }
  };
  const handleSignInByEmail = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    // collecting data from the form
    const form = (e.target as HTMLButtonElement).closest("form");
    if (form) {
      const formData = new FormData(form);
      const email = formData.get("email");
      const password = formData.get("pass");

      console.log("Email:", email);
      console.log("Password:", password);

      try {
        const response = await axios.get(
          `http://localhost:5000/signin/${email}`
        );
        console.log(response.data);

        router.push("/");
      } catch (error) {
        console.error("Error signing in:", error);
      }
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-screen py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Sign in
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="john@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input name="pass" id="password" type="password" required />
              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <Button
              onClick={handleSignInByEmail}
              type="submit"
              className="w-full cursor-pointer"
            >
              Sign In
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              onClick={handleGithubSignIn}
              className="cursor-pointer"
              variant="outline"
              size="icon"
            >
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer"
              size="icon"
              onClick={handleGoogleSignIn}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="15.25"
                viewBox="0 0 488 512"
              >
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
              </svg>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-primary underline underline-offset-4 hover:text-primary/90 "
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
