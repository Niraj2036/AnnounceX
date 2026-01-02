"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRegister } from "@/hooks/useauth";
import { toast } from "sonner";

export function RegisterForm() {
  const { mutate, isPending } = useRegister();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const password = form.get("password") as string;
    const confirmPassword = form.get("confirmPassword") as string;
    const email = form.get("email") as string;

    if (password.length < 8) {
      toast.error("Weak password", {
        description: "Password must be at least 8 characters",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password mismatch", {
        description: "Passwords do not match",
      });
      return;
    }

    mutate(
      {
        name: form.get("name") as string,
        email,
        password,
      },
      {
        onSuccess: () =>
          (window.location.href = `/verify-otp?email=${email}`),
        onError: () =>
          toast.error("Registration failed", {
            description: "Email may already be registered",
          }),
      }
    );
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">Create account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input name="name" placeholder="Full name" required />
          <Input name="email" placeholder="Email" required />
          <Input name="password" type="password" placeholder="Password" required />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            required
          />
          <Button className="w-full" disabled={isPending}>
            {isPending ? "Creating..." : "Create account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
