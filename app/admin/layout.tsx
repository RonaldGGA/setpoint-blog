import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // No hay sesión → al login
  if (!session) {
    redirect("/login");
  }

  // Tiene sesión pero no es admin → a la home
  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return <>{children}</>;
}
