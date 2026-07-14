import { SITE_NAME } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <p className="mx-auto max-w-5xl px-6 text-center font-mono text-xs text-muted">
        Designed & built by {SITE_NAME}
      </p>
    </footer>
  );
}
