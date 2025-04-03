"use client";

import type React from "react";

import Link from "next/link";
import { Github, Twitter } from "lucide-react";
import { useEffect } from "react";
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

import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Signin() {
  const router = useRouter();
  const { data, status } = useSession();

  // Use useEffect to handle the data change
  useEffect(() => {
    const storeUserInfo = async () => {
      if (data?.user) {
        try {
          //console.log("User data from data?.user:", data.user);
          const userInfo = {
            username: data.user.name,
            email: data.user.email,
            picture: data.user.image,
          };
          const response = await axios.post(
            "https://quiz-mania-iota.vercel.app/signup",
            userInfo
          );
          console.log("User info stored:", response.data);
          router.push("/");
        } catch (error) {
          console.error("Error storing user info:", error);
        }
      }
    };

    if (status === "authenticated") {
      storeUserInfo();
    }
  }, [data, status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google");
      toast.success(` You'r Successfully Logged in`);
      // it will be handled by the useEffect
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleGithubSignIn = async () => {
    try {
       await signIn("github");
       toast.success(` You'r Successfully Logged in`);
      // data handling moved to useEffect
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
      if (!email || !password) {
        toast.error("Please fill in all fields.");
        return;
      }
      if (typeof password === "string" && password.length < 6) {
        toast.error("Password should be at least 6 characters.");
        return;
      }
      if (typeof password === "string" && !/[A-Z]/.test(password)) {
        toast.error("Password must contain at least one uppercase letter.");
        return;
      }
      if (typeof password === "string" && !/[a-z]/.test(password)) {
        toast.error("Password must contain at least one lowercase letter.");
        return;
      }
      if (typeof password === "string" && !/[0-9]/.test(password)) {
        toast.error("Password must contain at least one number.");
        return;
      }
      if (typeof password === "string" && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        toast.error("Password must contain at least one special character (!@#$%^&* etc.).");
        return;
      }
      console.log("Email:", email);
      console.log("Password:", password);

      try {
        const response = await axios.get(
          `https://quiz-mania-iota.vercel.app/signin/${email}`
        );
        console.log("Response from Signin:", response.data);
        if (response.data.status && response.data.userInfo) {
          const userInfo = response.data.userInfo;
          console.log("User info:", userInfo);

          //manually sign the user in nextauth
          await signIn("credentials", {
            email: userInfo.email,
            password: userInfo.password,
            redirect: false,});
            toast.success(` You'r Successfully Logged in`);
          // Redirect to the home page or any other page after successful sign-in
          router.push("/");
        }
      } catch (error) {
        console.error("Error signing in:", error);
      }
    }
  };
console.log("data:", data ,status);
  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen py-8">
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
