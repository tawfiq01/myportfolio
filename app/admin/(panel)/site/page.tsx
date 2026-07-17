import { prisma } from "@/lib/db";
import { getSiteContent } from "@/lib/queries";
import { saveSiteContent } from "../../actions";
import { Card, DbNotice, Field, PageHeader, SaveButton, inputCls } from "@/components/admin/ui";

export default async function SiteContentAdmin() {
  const site = await getSiteContent();

  return (
    <>
      <PageHeader
        title="Site content"
        hint="Hero, about, contact and social links — everything outside the lists."
      />
      <DbNotice connected={Boolean(prisma)} />
      <form action={saveSiteContent} className="space-y-6">
        <Card>
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted">Hero</p>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Greeting">
                <input name="heroGreeting" defaultValue={site.heroGreeting} required className={inputCls} />
              </Field>
              <Field label="Headline (your name)">
                <input name="heroHeadline" defaultValue={site.heroHeadline} required className={inputCls} />
              </Field>
            </div>
            <Field label="Tagline">
              <input name="heroTagline" defaultValue={site.heroTagline} required className={inputCls} />
            </Field>
            <Field label="Intro (large text in About section)">
              <textarea name="heroIntro" defaultValue={site.heroIntro} rows={3} required className={inputCls} />
            </Field>
          </div>
        </Card>

        <Card>
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted">About</p>
          <Field label="Paragraphs (one per line)">
            <textarea
              name="aboutParagraphs"
              defaultValue={site.aboutParagraphs.join("\n")}
              rows={6}
              className={inputCls}
            />
          </Field>
        </Card>

        <Card>
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted">Contact</p>
          <div className="space-y-4">
            <Field label="Blurb">
              <textarea name="contactBlurb" defaultValue={site.contactBlurb} rows={3} required className={inputCls} />
            </Field>
            <Field label="Button label">
              <input name="contactCtaLabel" defaultValue={site.contactCtaLabel} required className={inputCls} />
            </Field>
          </div>
        </Card>

        <Card>
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted">Socials</p>
          <div className="space-y-4">
            <Field label="Email">
              <input name="email" type="email" defaultValue={site.email} required className={inputCls} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="GitHub URL">
                <input name="github" defaultValue={site.github} required className={inputCls} />
              </Field>
              <Field label="LinkedIn URL">
                <input name="linkedin" defaultValue={site.linkedin} required className={inputCls} />
              </Field>
            </div>
          </div>
        </Card>

        <SaveButton label="Save site content" />
      </form>
    </>
  );
}
