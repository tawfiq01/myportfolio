import { prisma } from "@/lib/db";
import { deleteMenuItem, saveMenuItem } from "../../actions";
import { Card, DangerButton, DbNotice, Field, PageHeader, SaveButton, inputCls } from "@/components/admin/ui";

type Row = { id: string | null; label: string; href: string; visible: boolean; sortOrder: number };

const EMPTY: Row = { id: null, label: "", href: "#", visible: true, sortOrder: 0 };

function MenuItemForm({ row }: { row: Row }) {
  return (
    <Card>
      <form action={saveMenuItem} className="space-y-4">
        {row.id && <input type="hidden" name="id" value={row.id} />}
        <div className="grid gap-4 sm:grid-cols-[1fr_1fr_100px]">
          <Field label="Label">
            <input name="label" defaultValue={row.label} required className={inputCls} />
          </Field>
          <Field label="Link (e.g. #projects)">
            <input name="href" defaultValue={row.href} required className={inputCls} />
          </Field>
          <Field label="Order">
            <input name="sortOrder" type="number" defaultValue={row.sortOrder} className={inputCls} />
          </Field>
        </div>
        <label className="flex items-center gap-2 text-sm text-muted">
          <input type="checkbox" name="visible" defaultChecked={row.visible} className="accent-[#455ce9]" />
          Visible in menu
        </label>
        <div className="flex gap-3">
          <SaveButton label={row.id ? "Save" : "Add menu item"} />
          {row.id && <DangerButton label="Delete" formAction={deleteMenuItem} />}
        </div>
      </form>
    </Card>
  );
}

export default async function MenuAdmin() {
  const rows = prisma
    ? await prisma.menuItem.findMany({ orderBy: { sortOrder: "asc" } }).catch(() => [])
    : [];

  return (
    <>
      <PageHeader
        title="Menu"
        hint="Header and drawer navigation. Untick Visible to hide an item without deleting it."
      />
      <DbNotice connected={Boolean(prisma)} />
      <div className="space-y-6">
        {rows.map((row) => (
          <MenuItemForm key={row.id} row={row} />
        ))}
        <h2 className="pt-4 text-sm uppercase tracking-[0.2em] text-muted">Add new</h2>
        <MenuItemForm row={EMPTY} />
      </div>
    </>
  );
}
