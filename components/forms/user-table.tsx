"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";

export const getFallbackString = (
  firstName: string | null,
  lastName: string | null
) => {
  if (!lastName || !firstName || firstName.length > 0 || lastName.length > 0)
    return "HM";
  return firstName[0].toUpperCase() + lastName[0].toUpperCase();
};

type UserTableUser = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string;
  emailAddresses: string[];
};

async function UserTable({
  users,
  onRemoveClick,
}: {
  users: UserTableUser[];
  onRemoveClick: (user: UserTableUser) => Promise<void>;
}) {
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
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  width="30px"
                  alt={`${user.firstName} ${user.lastName}`}
                  src={user.imageUrl}
                />
              </TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.emailAddresses.join(", ")}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  className="underline text-blue-500"
                  onClick={() => onRemoveClick(user)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default UserTable;
