import { prisma } from "@/lib/db";
import { getThemeSettings } from "@/lib/queries";
import { saveTheme } from "../../actions";
import { Card, DbNotice, Field, PageHeader, SaveButton, inputCls } from "@/components/admin/ui";

export default async function AppearanceAdmin() {
  const theme = await getThemeSettings();

  return (
    <>
      <PageHeader
        title="Appearance"
        hint="Brand colors and the visitor light/dark toggle. All shades (hover, drawer, hero tint) derive automatically from these two colors."
      />
      <DbNotice connected={Boolean(prisma)} />
      <form action={saveTheme} className="space-y-6">
        <Card>
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted">Colors</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Accent color (buttons, badge, highlights)">
              <input
                name="accent"
                type="color"
                defaultValue={theme.accent}
                className="h-12 w-full cursor-pointer rounded-lg border border-white/10 bg-[#1a1b1e] p-1"
              />
            </Field>
            <Field label="Background color (dark sections)">
              <input
                name="background"
                type="color"
                defaultValue={theme.background}
                className="h-12 w-full cursor-pointer rounded-lg border border-white/10 bg-[#1a1b1e] p-1"
              />
            </Field>
          </div>
          <p className="mt-4 text-xs text-muted">
            Defaults: accent <code className={`${inputCls} inline w-auto px-2 py-0.5`}>#455ce9</code>, background{" "}
            <code className={`${inputCls} inline w-auto px-2 py-0.5`}>#1c1d20</code>
          </p>
        </Card>

        <Card>
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted">Light / dark</p>
          <label className="flex items-center gap-3 text-sm text-muted">
            <input
              type="checkbox"
              name="themeToggle"
              defaultChecked={theme.themeToggle}
              className="h-4 w-4 accent-[#455ce9]"
            />
            Show a light/dark toggle to visitors (site stays dark by default)
          </label>
        </Card>

        <div className="flex gap-3">
          <SaveButton label="Save appearance" />
          <button
            type="submit"
            name="reset"
            value="1"
            className="rounded-full border border-white/15 px-6 py-2 text-sm text-muted transition-colors hover:border-white/40 hover:text-foreground"
          >
            Reset colors to default
          </button>
        </div>
      </form>
    </>
  );
}
