"use client";

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
// import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useRouter } from "next/navigation";

const image_hosting_key = process.env.NEXT_PUBLIC_IMGBB_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
export default function SignupPage() {
  const router = useRouter();

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const form = (e.target as HTMLButtonElement).closest("form");
    if (form) {
      const formData = new FormData(form);
      // Collecting all form data
      const data = {
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        picture: formData.get("picture") as File,
        password: formData.get("password") as string,
        // confirmPassword: formData.get("confirm-password") as string,
      };

      // Upload the image to imgbb
      const imageFile = data.picture;
      const formDataForImage = new FormData();
      formDataForImage.append("image", imageFile);
      const res = await axios.post(image_hosting_api, formDataForImage, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      // now send this data to database

      const userData = {
        username: data.username,
        email: data.email,
        phone: data.phone,
        picture: res.data.data.display_url,
        password: data.password,
        // confirmPassword: data.confirmPassword,
      };

      console.log(userData);

      try {
        const response = await axios.post(
          "https://quiz-mania-iota.vercel.app/signup",
          userData
        );

        //console.log("Response from Sign-up:", response);
        router.push("/auth/signin");
      } catch (error) {
        console.error("Error signing up:", error);
      }
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Sign up
          </CardTitle>
          <CardDescription className="text-center">
            Create a new account to get started
          </CardDescription>
        </CardHeader>
        <form>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                name="username"
                id="username"
                placeholder="johndoe"
                required
              />
            </div>
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
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="picture">Profile Picture</Label>
              <Input
                id="picture"
                name="picture"
                type="file"
                accept="image/*"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
              />
            </div>
            <Button
              onClick={handleSignUp}
              type="submit"
              className="w-full cursor-pointer"
            >
              Sign Up
            </Button>
          </CardContent>
        </form>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="text-primary underline underline-offset-4 hover:text-primary/90"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
