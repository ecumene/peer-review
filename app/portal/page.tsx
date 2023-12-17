"use client";
import { OrganizationList } from "@clerk/nextjs";

export default function Portal() {
  return (
    <OrganizationList
      afterSelectOrganizationUrl={() => "/portal/meetings"}
      afterCreateOrganizationUrl={() => "/portal/meetings"}
      hidePersonal
    />
  );
}
