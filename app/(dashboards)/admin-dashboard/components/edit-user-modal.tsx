"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignUpModal() {
  const [open, setOpen] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    // handle sign-up logic here
    console.log("Sign up form submitted");
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="mx-auto block">
        Open Sign Up Modal
      </Button>
    </>
  );
}
