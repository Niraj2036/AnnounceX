import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/providers/query-provider";
import { AuthProvider } from "@/context/auth-context";
import "./globals.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AuthProvider>
        {children}
        <Toaster richColors />
        </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
