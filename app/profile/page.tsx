import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileForm from "../components/ProfileForm";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) redirect("/login");

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-px w-6 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Profile
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-text-primary">
            Account settings
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            Manage your name and avatar.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-8">
          <ProfileForm
            initialName={session.user.name ?? ""}
            initialImage={session.user.image ?? null}
            email={session.user.email}
          />
        </div>
      </div>
    </main>
  );
}
