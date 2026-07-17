"use client";

import { useActionState } from "react";
import { changePassword, type ChangePasswordState } from "@/app/admin/actions";

const inputCls =
  "w-full rounded-lg border border-white/10 bg-[#1a1b1e] px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent";

export default function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState<ChangePasswordState, FormData>(
    changePassword,
    {},
  );

  return (
    <form action={formAction} className="space-y-4">
      <label className="block">
        <span className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-muted">
          Current password
        </span>
        <input type="password" name="current" required autoComplete="current-password" className={inputCls} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-muted">
          New password (min 8 characters)
        </span>
        <input type="password" name="next" required minLength={8} autoComplete="new-password" className={inputCls} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-muted">
          Confirm new password
        </span>
        <input type="password" name="confirm" required minLength={8} autoComplete="new-password" className={inputCls} />
      </label>

      {state.error && <p className="text-sm text-red-300">{state.error}</p>}
      {state.success && (
        <p className="text-sm text-green-300">
          Password changed. Other devices are signed out; this one stays in.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-accent px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Changing…" : "Change password"}
      </button>
    </form>
  );
}
