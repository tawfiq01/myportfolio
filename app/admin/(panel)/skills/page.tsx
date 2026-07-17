import { prisma } from "@/lib/db";
import { deleteSkillGroup, saveSkillGroup } from "../../actions";
import { Card, DangerButton, DbNotice, Field, PageHeader, SaveButton, inputCls } from "@/components/admin/ui";

type Row = { id: string | null; label: string; items: string[]; sortOrder: number };

const EMPTY: Row = { id: null, label: "", items: [], sortOrder: 0 };

function SkillGroupForm({ row }: { row: Row }) {
  return (
    <Card>
      <form action={saveSkillGroup} className="space-y-4">
        {row.id && <input type="hidden" name="id" value={row.id} />}
        <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
          <Field label="Group label">
            <input name="label" defaultValue={row.label} required className={inputCls} />
          </Field>
          <Field label="Order">
            <input name="sortOrder" type="number" defaultValue={row.sortOrder} className={inputCls} />
          </Field>
        </div>
        <Field label="Skills (one per line)">
          <textarea name="items" defaultValue={row.items.join("\n")} rows={4} className={inputCls} />
        </Field>
        <div className="flex gap-3">
          <SaveButton label={row.id ? "Save" : "Add group"} />
          {row.id && <DangerButton label="Delete" formAction={deleteSkillGroup} />}
        </div>
      </form>
    </Card>
  );
}

export default async function SkillsAdmin() {
  const rows = prisma
    ? await prisma.skillGroup.findMany({ orderBy: { sortOrder: "asc" } }).catch(() => [])
    : [];

  return (
    <>
      <PageHeader title="Skills" hint="Groups appear as the numbered columns in the Skills section." />
      <DbNotice connected={Boolean(prisma)} />
      <div className="space-y-6">
        {rows.map((row) => (
          <SkillGroupForm key={row.id} row={row} />
        ))}
        <h2 className="pt-4 text-sm uppercase tracking-[0.2em] text-muted">Add new</h2>
        <SkillGroupForm row={EMPTY} />
      </div>
    </>
  );
}
