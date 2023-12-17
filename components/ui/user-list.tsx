import { clerkClient } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Skeleton } from "./skeleton";

type ClerkID = string;

export const getFallbackString = (
  firstName: string | null,
  lastName: string | null
) => {
  if (!lastName || !firstName || firstName.length > 0 || lastName.length > 0)
    return "HM";
  return firstName[0].toUpperCase() + lastName[0].toUpperCase();
};

async function UserList({ ids }: { ids: ClerkID[] }) {
  const users = ids
    ? await clerkClient.users.getUserList({
        userId: ids,
      })
    : [];
  return (
    <div>
      <div className="flex -space-x-4">
        {users.slice(0, 10).map(({ id, imageUrl, firstName, lastName }) => (
          <Avatar key={id}>
            <AvatarImage src={imageUrl} alt={`${firstName} ${lastName}`} />
            <AvatarFallback>
              {getFallbackString(firstName, lastName)}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
    </div>
  );
}

const UserListSkeleton = ({ number }: { number: number }) => (
  <div className="flex -space-x-4">
    {Array.from(Array(number)).map((i) => (
      <Skeleton key={i} className="h-10 w-10 rounded-full" />
    ))}
  </div>
);

UserList.Skeleton = UserListSkeleton;

export default UserList;
