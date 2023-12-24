import { clerkClient } from "@clerk/nextjs/server";

export const slugOrgGuard = async (userId: string, slug: string) => {
  const org = await clerkClient.organizations.getOrganization({ slug });
  const memberships =
    await clerkClient.organizations.getOrganizationMembershipList({
      organizationId: org.id,
    });

  if (
    memberships.map((member) => member.publicUserData?.userId).includes(userId)
  )
    return org;

  //todo: proper 400 status code
  throw new Error("User doesn't belong to org");
};
