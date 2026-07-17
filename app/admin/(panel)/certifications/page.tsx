import { prisma } from "@/lib/db";
import { deleteCertification, saveCertification } from "../../actions";
import { Card, DangerButton, DbNotice, Field, PageHeader, SaveButton, inputCls } from "@/components/admin/ui";

type Row = {
  id: string | null;
  name: string;
  issuer: string;
  year: string;
  href: string | null;
  sortOrder: number;
};

const EMPTY: Row = { id: null, name: "", issuer: "", year: "", href: null, sortOrder: 0 };

function CertificationForm({ row }: { row: Row }) {
  return (
    <Card>
      <form action={saveCertification} className="space-y-4">
        {row.id && <input type="hidden" name="id" value={row.id} />}
        <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
          <Field label="Name">
            <input name="name" defaultValue={row.name} required className={inputCls} />
          </Field>
          <Field label="Order">
            <input name="sortOrder" type="number" defaultValue={row.sortOrder} className={inputCls} />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Issuer">
            <input name="issuer" defaultValue={row.issuer} required className={inputCls} />
          </Field>
          <Field label="Year">
            <input name="year" defaultValue={row.year} required className={inputCls} />
          </Field>
        </div>
        <Field label="Credential URL (optional)">
          <input name="href" defaultValue={row.href ?? ""} className={inputCls} />
        </Field>
        <div className="flex gap-3">
          <SaveButton label={row.id ? "Save" : "Add certification"} />
          {row.id && <DangerButton label="Delete" formAction={deleteCertification} />}
        </div>
      </form>
    </Card>
  );
}

export default async function CertificationsAdmin() {
  const rows = prisma
    ? await prisma.certification.findMany({ orderBy: { sortOrder: "asc" } }).catch(() => [])
    : [];

  return (
    <>
      <PageHeader title="Certifications" hint="Listed in the Certifications section." />
      <DbNotice connected={Boolean(prisma)} />
      <div className="space-y-6">
        {rows.map((row) => (
          <CertificationForm key={row.id} row={row} />
        ))}
        <h2 className="pt-4 text-sm uppercase tracking-[0.2em] text-muted">Add new</h2>
        <CertificationForm row={EMPTY} />
      </div>
    </>
  );
}
