import { getSyndicationSettings } from "@/lib/actions/syndication";
import { getSyndicationLogsPaginated } from "@/lib/actions/syndication";
import SyndicationRow from "@/app/components/admin/SyndicationRow";
import { Rss } from "lucide-react";
import SyndicationLogList from "@/app/components/admin/SyndicationLogList";

export default async function AdminSyndicationPage() {
  const [settings, { logs, nextCursor }] = await Promise.all([
    getSyndicationSettings(),
    getSyndicationLogsPaginated(),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-2xl font-bold text-text-primary">
          Syndication
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Control which articles get published to Hashnode automatically.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-sm font-semibold text-text-primary">
          Article settings
        </h2>
        {settings.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-16">
            <Rss size={24} className="text-border" />
            <p className="text-sm text-text-muted">
              No syndication settings configured yet.
            </p>
            <p className="text-xs text-text-muted">
              Settings are created automatically when an article webhook fires.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border rounded-xl border border-border bg-surface">
            {settings.map((s) => (
              <SyndicationRow key={s.articleSlug} setting={s} />
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="mb-4 text-sm font-semibold text-text-primary">
          Activity log
        </h2>
        <SyndicationLogList initialLogs={logs} initialNextCursor={nextCursor} />
      </div>
    </div>
  );
}
