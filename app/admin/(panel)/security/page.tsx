import { prisma } from "@/lib/db";
import { Card, DbNotice, PageHeader } from "@/components/admin/ui";
import ChangePasswordForm from "@/components/admin/ChangePasswordForm";

export default async function SecurityAdmin() {
  return (
    <>
      <PageHeader
        title="Security"
        hint="Change the admin password. The new password is stored hashed in the database and takes effect immediately."
      />
      <DbNotice connected={Boolean(prisma)} />
      <Card>
        <ChangePasswordForm />
      </Card>
    </>
  );
}
