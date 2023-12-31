"use client";
import { OrganizationList } from "@clerk/nextjs";

export default function Portal() {
  return (
    <OrganizationList
      afterSelectOrganizationUrl={(org) => `/portal/${org.slug}`}
      afterCreateOrganizationUrl={(org) => `/portal/${org.slug}`}
      hidePersonal
    />
  );
}
