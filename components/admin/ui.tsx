// Tiny presentational helpers shared by all admin pages — one visual language,
// no client JS.

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#242528] p-6">{children}</div>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-muted">{label}</span>
      {children}
    </label>
  );
}

export const inputCls =
  "w-full rounded-lg border border-white/10 bg-[#1a1b1e] px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent";

export function SaveButton({ label = "Save" }: { label?: string }) {
  return (
    <button
      type="submit"
      className="rounded-full bg-accent px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
    >
      {label}
    </button>
  );
}

export function DangerButton({
  label,
  formAction,
}: {
  label: string;
  formAction: (formData: FormData) => Promise<void>;
}) {
  return (
    <button
      type="submit"
      formAction={formAction}
      className="rounded-full border border-red-400/40 px-5 py-2 text-sm text-red-300 transition-colors hover:bg-red-400/10"
    >
      {label}
    </button>
  );
}

export function PageHeader({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-medium">{title}</h1>
      {hint && <p className="mt-1 text-sm text-muted">{hint}</p>}
    </div>
  );
}

export function DbNotice({ connected }: { connected: boolean }) {
  if (connected) return null;
  return (
    <p className="mb-6 rounded-lg border border-yellow-400/30 bg-yellow-400/10 px-4 py-3 text-sm text-yellow-200">
      Database not connected (no DATABASE_URL) — forms are visible but saving will fail.
      On Vercel this is configured automatically.
    </p>
  );
}
