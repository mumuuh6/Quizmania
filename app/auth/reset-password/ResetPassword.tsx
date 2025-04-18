"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "react-toastify"

import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import UseAxiosNormal from "@/app/hook/(axoisSecureNormal)/axiosNormal"

export default function ResetPasswordPage() {
  const axiosInstanceNormal = UseAxiosNormal()
    const [userSetId, setUserSetId] = useState<string | null>(null)
    const Router=useRouter()
  const searchParams=useSearchParams()
  useEffect(() => {
    const userId = searchParams.get("secretcode")
    setUserSetId(userId)
  }, [searchParams])
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = (event.target as HTMLButtonElement).closest("form");
    const formData = new FormData(form)
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirm-password") as string

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter.");
      return;
    }
    if (!/[0-9]/.test(password)) {
      toast.error("Password must contain at least one number.");
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      toast.error("Password must contain at least one special character (!@#$%^&* etc.).");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not matchh")
      return
    }
    console.log("passwrd",password)
    try{
        const response= await axiosInstanceNormal.patch(`/reset-password/${userSetId}`,{password:password}
        )
        console.log(response.data);
        if(response.data.expired){
            toast.info("Please send a new reset password link request")
            Router.push("/auth/signin")
        }
        else if(response.data.status){
            toast.success(response.data.message)
            Router.push("/auth/signin")
        }
        else if(!response.data.status){ 
            toast.error(response.data.message)
        }
        
    }
    catch(error){  
        console.error("Error resetting password:", error);
        toast.error("Error resetting password. Please try again later.")
    }
    
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
          <CardDescription className="text-center">Enter your new password below</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" name="confirm-password" type="password" required />
            </div>
            <Button  
            type="submit" className="w-full">
              Reset Password
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link href="/auth/signin" className="text-primary underline underline-offset-4 hover:text-primary/90">
              Back to sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

