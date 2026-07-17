import { prisma } from "@/lib/db";
import { deleteProject, saveProject } from "../../actions";
import { Card, DangerButton, DbNotice, Field, PageHeader, SaveButton, inputCls } from "@/components/admin/ui";

type Row = {
  id: string | null;
  name: string;
  description: string;
  tech: string[];
  href: string | null;
  imageUrl: string | null;
  highlight: boolean;
  sortOrder: number;
};

const EMPTY: Row = {
  id: null,
  name: "",
  description: "",
  tech: [],
  href: null,
  imageUrl: null,
  highlight: false,
  sortOrder: 0,
};

function ProjectForm({ row }: { row: Row }) {
  return (
    <Card>
      <form action={saveProject} className="space-y-4">
        {row.id && <input type="hidden" name="id" value={row.id} />}
        <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
          <Field label="Name">
            <input name="name" defaultValue={row.name} required className={inputCls} />
          </Field>
          <Field label="Order">
            <input name="sortOrder" type="number" defaultValue={row.sortOrder} className={inputCls} />
          </Field>
        </div>
        <Field label="Description">
          <textarea name="description" defaultValue={row.description} rows={3} required className={inputCls} />
        </Field>
        <Field label="Tags (one per line)">
          <textarea name="tech" defaultValue={row.tech.join("\n")} rows={3} className={inputCls} />
        </Field>
        <Field label="Link (optional)">
          <input name="href" defaultValue={row.href ?? ""} className={inputCls} />
        </Field>
        {row.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={row.imageUrl}
            alt={row.name}
            className="h-28 w-44 rounded-lg border border-white/10 object-cover"
          />
        )}
        <Field label={row.imageUrl ? "Replace image (optional)" : "Image (optional)"}>
          <input
            name="image"
            type="file"
            accept="image/*"
            className={`${inputCls} file:mr-3 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-1 file:text-white`}
          />
        </Field>
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm text-muted">
            <input type="checkbox" name="highlight" defaultChecked={row.highlight} className="accent-[#455ce9]" />
            Featured
          </label>
          {row.imageUrl && (
            <label className="flex items-center gap-2 text-sm text-muted">
              <input type="checkbox" name="removeImage" className="accent-[#455ce9]" />
              Remove image
            </label>
          )}
        </div>
        <div className="flex gap-3">
          <SaveButton label={row.id ? "Save" : "Add case study"} />
          {row.id && <DangerButton label="Delete" formAction={deleteProject} />}
        </div>
      </form>
    </Card>
  );
}

export default async function ProjectsAdmin() {
  const rows = prisma
    ? await prisma.project.findMany({ orderBy: { sortOrder: "asc" } }).catch(() => [])
    : [];

  return (
    <>
      <PageHeader title="Case studies" hint="Shown in the Case studies section, ordered by Order." />
      <DbNotice connected={Boolean(prisma)} />
      <div className="space-y-6">
        {rows.map((row) => (
          <ProjectForm key={row.id} row={row} />
        ))}
        <h2 className="pt-4 text-sm uppercase tracking-[0.2em] text-muted">Add new</h2>
        <ProjectForm row={EMPTY} />
      </div>
    </>
  );
}
