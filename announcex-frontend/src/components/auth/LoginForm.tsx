"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useLogin } from "@/hooks/useauth";
import { toast } from "sonner";

export function LoginForm() {
  const { mutate, isPending } = useLogin();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    mutate(
      {
        email: form.get("email") as string,
        password: form.get("password") as string,
      },
      {
        onSuccess: () => (window.location.href = "/dashboard"),
        onError: () =>
          toast.error("Login failed", {
            description: "Invalid email or password",
          }),
      }
    );
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">Welcome back</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input name="email" placeholder="Email" required />
          <Input name="password" type="password" placeholder="Password" required />
          <Button className="w-full" disabled={isPending}>
            {isPending ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
