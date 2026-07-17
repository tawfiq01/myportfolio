/* eslint-disable @next/next/no-img-element */
import { prisma } from "@/lib/db";
import { deleteGalleryImage, saveGalleryImage } from "../../actions";
import { Card, DangerButton, DbNotice, Field, PageHeader, SaveButton, inputCls } from "@/components/admin/ui";

export default async function GalleryAdmin() {
  const rows = prisma
    ? await prisma.galleryImage.findMany({ orderBy: { sortOrder: "asc" } }).catch(() => [])
    : [];

  return (
    <>
      <PageHeader
        title="Gallery"
        hint="Images shown in the Gallery section. The section (and its menu item) only appears when there is at least one image."
      />
      <DbNotice connected={Boolean(prisma)} />
      <div className="space-y-6">
        {rows.map((row) => (
          <Card key={row.id}>
            <form action={saveGalleryImage} className="space-y-4">
              <input type="hidden" name="id" value={row.id} />
              <div className="flex gap-5">
                <img
                  src={row.imageUrl}
                  alt={row.title || "Gallery image"}
                  className="h-28 w-40 shrink-0 rounded-lg border border-white/10 object-cover"
                />
                <div className="min-w-0 flex-1 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
                    <Field label="Title (optional)">
                      <input name="title" defaultValue={row.title} className={inputCls} />
                    </Field>
                    <Field label="Order">
                      <input name="sortOrder" type="number" defaultValue={row.sortOrder} className={inputCls} />
                    </Field>
                  </div>
                  <Field label="Replace image (optional)">
                    <input name="image" type="file" accept="image/*" className={`${inputCls} file:mr-3 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-1 file:text-white`} />
                  </Field>
                </div>
              </div>
              <div className="flex gap-3">
                <SaveButton />
                <DangerButton label="Delete" formAction={deleteGalleryImage} />
              </div>
            </form>
          </Card>
        ))}

        <h2 className="pt-4 text-sm uppercase tracking-[0.2em] text-muted">Add new</h2>
        <Card>
          <form action={saveGalleryImage} className="space-y-4">
            <Field label="Image file (max 10 MB)">
              <input
                name="image"
                type="file"
                accept="image/*"
                required
                className={`${inputCls} file:mr-3 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-1 file:text-white`}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
              <Field label="Title (optional)">
                <input name="title" className={inputCls} />
              </Field>
              <Field label="Order">
                <input name="sortOrder" type="number" defaultValue={0} className={inputCls} />
              </Field>
            </div>
            <SaveButton label="Upload image" />
          </form>
        </Card>
      </div>
    </>
  );
}
