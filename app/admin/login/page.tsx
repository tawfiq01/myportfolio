"use client";

import { useActionState } from "react";
import { login, type LoginState } from "../actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-6 text-foreground">
      <form
        action={formAction}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#242528] p-8"
      >
        <h1 className="text-xl font-medium">Admin login</h1>
        <p className="mt-1 text-sm text-muted">Tawfiqul Islam — portfolio CMS</p>

        <label className="mt-8 block">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-muted">
            Password
          </span>
          <input
            type="password"
            name="password"
            required
            autoFocus
            className="w-full rounded-lg border border-white/10 bg-[#1a1b1e] px-3 py-2 text-sm outline-none transition-colors focus:border-accent"
          />
        </label>

        {state.error && <p className="mt-3 text-sm text-red-300">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="mt-6 w-full rounded-full bg-accent py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
