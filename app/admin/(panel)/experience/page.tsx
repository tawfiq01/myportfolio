import { prisma } from "@/lib/db";
import { deleteExperience, saveExperience } from "../../actions";
import { Card, DangerButton, DbNotice, Field, PageHeader, SaveButton, inputCls } from "@/components/admin/ui";

type Row = {
  id: string | null;
  role: string;
  company: string;
  companyUrl: string | null;
  start: string;
  end: string | null;
  summary: string;
  highlights: string[];
  sortOrder: number;
};

const EMPTY: Row = {
  id: null,
  role: "",
  company: "",
  companyUrl: null,
  start: "",
  end: null,
  summary: "",
  highlights: [],
  sortOrder: 0,
};

function ExperienceForm({ row }: { row: Row }) {
  return (
    <Card>
      <form action={saveExperience} className="space-y-4">
        {row.id && <input type="hidden" name="id" value={row.id} />}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Role">
            <input name="role" defaultValue={row.role} required className={inputCls} />
          </Field>
          <Field label="Company">
            <input name="company" defaultValue={row.company} required className={inputCls} />
          </Field>
        </div>
        <Field label="Company URL (optional)">
          <input name="companyUrl" defaultValue={row.companyUrl ?? ""} className={inputCls} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Start (e.g. 2024)">
            <input name="start" defaultValue={row.start} required className={inputCls} />
          </Field>
          <Field label="End (empty = Present)">
            <input name="end" defaultValue={row.end ?? ""} className={inputCls} />
          </Field>
          <Field label="Order">
            <input name="sortOrder" type="number" defaultValue={row.sortOrder} className={inputCls} />
          </Field>
        </div>
        <Field label="Summary">
          <textarea name="summary" defaultValue={row.summary} rows={3} required className={inputCls} />
        </Field>
        <Field label="Highlights (one per line)">
          <textarea name="highlights" defaultValue={row.highlights.join("\n")} rows={4} className={inputCls} />
        </Field>
        <div className="flex gap-3">
          <SaveButton label={row.id ? "Save" : "Add experience"} />
          {row.id && <DangerButton label="Delete" formAction={deleteExperience} />}
        </div>
      </form>
    </Card>
  );
}

export default async function ExperienceAdmin() {
  const rows = prisma
    ? await prisma.experience.findMany({ orderBy: { sortOrder: "asc" } }).catch(() => [])
    : [];

  return (
    <>
      <PageHeader title="Experience" hint="Your roles, newest first (use Order to control position)." />
      <DbNotice connected={Boolean(prisma)} />
      <div className="space-y-6">
        {rows.map((row) => (
          <ExperienceForm key={row.id} row={row} />
        ))}
        <h2 className="pt-4 text-sm uppercase tracking-[0.2em] text-muted">Add new</h2>
        <ExperienceForm row={EMPTY} />
      </div>
    </>
  );
}
