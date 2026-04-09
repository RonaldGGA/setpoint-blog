import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "lucide-react";
import ProfileForm from "../components/ProfileForm";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/login");

  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <div className="space-y-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <User size={20} className="text-[var(--color-primary)]" />
            <h1 className="text-xl font-semibold text-[var(--color-text-primary)]">
              Profile
            </h1>
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">
            Manage your account settings
          </p>
        </div>

        <div className="h-px bg-[var(--color-border)]" />

        <ProfileForm
          initialName={session.user.name ?? ""}
          initialImage={session.user.image ?? null}
          email={session.user.email}
        />
      </div>
    </main>
  );
}
