import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="w-full max-w-md px-4">
        

        <RegisterForm />

        <p className="text-center text-sm text-zinc-500 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-zinc-900 underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
