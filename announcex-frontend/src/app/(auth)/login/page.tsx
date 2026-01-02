import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="w-full max-w-md px-4">
        

        <LoginForm />

        <p className="text-center text-sm text-zinc-500 mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-zinc-900 underline">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
