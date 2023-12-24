"use client";

import { OrganizationSwitcher } from "@clerk/nextjs";

export default function OrgSwitcher() {
  return (
    <OrganizationSwitcher
      afterSelectOrganizationUrl={(org) => `/portal/${org.slug}`}
      afterCreateOrganizationUrl={(org) => `/portal/${org.slug}`}
      afterLeaveOrganizationUrl="/"
      hidePersonal
    />
  );
}
