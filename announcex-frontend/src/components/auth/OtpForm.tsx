"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useVerifyOtp } from "@/hooks/useauth";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

export function OtpForm() {
  const params = useSearchParams();
  const email = params.get("email")!;
  const { mutate, isPending } = useVerifyOtp();

  const onSubmit = (e: any) => {
    e.preventDefault();
    const otp = e.target.otp.value;

    mutate(
      { email, otp, purpose: "EMAIL_VERIFICATION" },
      {
        onSuccess: () => (window.location.href = "/dashboard"),
        onError: () =>
          toast.error("Invalid OTP", {
            description: "Please check the code and try again",
          }),
      }
    );
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">Verify OTP</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input name="otp" placeholder="Enter OTP" required />
          <Button className="w-full" disabled={isPending}>
            {isPending ? "Verifying..." : "Verify"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
