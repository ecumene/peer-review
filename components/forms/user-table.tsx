import { clerkClient } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";

type ClerkID = string;

export const getFallbackString = (
  firstName: string | null,
  lastName: string | null
) => {
  if (!lastName || !firstName || firstName.length > 0 || lastName.length > 0)
    return "HM";
  return firstName[0].toUpperCase() + lastName[0].toUpperCase();
};

async function UserTable({ ids }: { ids: ClerkID[] }) {
  const users = ids
    ? await clerkClient.users.getUserList({
        userId: ids,
      })
    : [];
  return (
    <div className="flex -space-x-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]" />
            <TableHead className="w-[200px]">First Name</TableHead>
            <TableHead className="w-[200px]">Last Name</TableHead>
            <TableHead className="w-[200px]">Email Address</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(
            ({ id, imageUrl, firstName, lastName, emailAddresses }) => (
              <TableRow key={id}>
                <TableCell>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    width="30px"
                    alt={`${firstName} ${lastName}`}
                    src={imageUrl}
                  />
                </TableCell>
                <TableCell>{firstName}</TableCell>
                <TableCell>{lastName}</TableCell>
                <TableCell>
                  {emailAddresses
                    .map(({ emailAddress }) => emailAddress)
                    .join(", ")}
                </TableCell>
                <TableCell className="text-right">
                  <Link className="underline text-blue-500" href="#">
                    Remove
                  </Link>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default UserTable;
