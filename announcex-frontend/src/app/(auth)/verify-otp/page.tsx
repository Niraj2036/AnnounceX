import { Suspense } from "react";
import { OtpForm } from "@/components/auth/OtpForm";

export default function VerifyOtpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="w-full max-w-md px-4">
        <h1 className="text-2xl font-semibold text-center mb-2 text-zinc-900">
          Verify your email
        </h1>

        <p className="text-center text-sm text-zinc-500 mb-6">
          Enter the 6-digit code sent to your email address
        </p>

        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <OtpForm />
        </Suspense>
      </div>
    </div>
  );
}
