import { buttonVariants } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import RedirectHack from "./redirect-hack";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import OrgSwitcher from "@/components/forms/org-switcher";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="flex justify-between items-center px-8 py-4 h-20">
        <RedirectHack />
        <h1 className="flex text-2xl font-bold items-center gap-2">
          <Link href="/portal">PeerReview</Link>
        </h1>
        <div className="flex gap-4 items-center">
          <OrgSwitcher />
          <UserButton />
        </div>
      </header>
      {children}
    </>
  );
}
