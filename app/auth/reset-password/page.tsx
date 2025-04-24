// app/auth/reset-password/page.tsx
import { Suspense } from "react"
import ResetPasswordPage from "../reset-password/ResetPassword"
import BrainLoading from "@/app/components/brain-loading"

export default function ResetPasswordWrapper() {
  return (
    <Suspense fallback={<div>
        <BrainLoading></BrainLoading>
    </div>}>
      <ResetPasswordPage />
    </Suspense>
  )
}
