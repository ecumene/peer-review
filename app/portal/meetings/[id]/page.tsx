import { db } from "@/app/db";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import { format } from "date-fns";
import UserList from "@/components/ui/user-list";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Suspense } from "react";
import Link from "next/link";
import { Meet, meets } from "@/app/schema";
import UserTable from "@/components/forms/user-table";
import CreateAMeeting, {
  type FormData,
} from "@/components/forms/create-meeting";
import { currentUser } from "@clerk/nextjs";
import { createMeetingSchema } from "@/lib/zod";

type Props = {
  params: {
    id: string;
  };
};

const toFormData = (meeting: Meet): FormData => ({
  ...meeting,
  dueDate: format(meeting.dueDate, "y-MM-dd"),
});

export default async function Page(props: Props) {
  const id = parseInt(props.params.id, 10);
  if (!id) return <>Invalid ID provided</>;
  const meeting = await db.query.meets.findFirst({
    where: eq(meets.id, id),
    with: {
      users: {
        where: (user, { eq }) => eq(user.userId, user.id),
      },
    },
  });

  const handleUpdate = async (d: FormData) => {
    "use server";

    const parsed = createMeetingSchema.parse(d);
    console.log(new Date(parsed.dueDate));
    await db
      .update(meets)
      .set({
        title: parsed.title,
        description: parsed.description,
        dueDate: new Date(parsed.dueDate),
      })
      .where(eq(meets.id, id));
  };

  if (!meeting) return notFound();

  return (
    <div className="container mx-auto">
      <main className="py-10 px-10 flex gap-12 flex-col lg:flex-row">
        <div>
          <h2 className="text-lg font-semibold">Meeting Details</h2>
          <div className="text-sm text-slate-500 mb-6">
            Change the details of your meeting
          </div>
          <CreateAMeeting
            onSubmit={handleUpdate}
            defaultValues={toFormData(meeting)}
            submitText="Update Details"
          />
        </div>
        <div className="flex-1 flex flex-col gap-8">
          <div>
            <h2 className="text-lg font-semibold">
              Meeting Attendees and Writers
            </h2>
            <div className="text-sm text-slate-500 mb-6">
              Who is participating in the meeting or writing memos.
            </div>
            <Suspense
              fallback={<UserList.Skeleton number={meeting.users.length} />}
            >
              <UserTable ids={meeting.users.map(({ userId }) => userId)} />
            </Suspense>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Memos and Documents</h2>
            <div className="text-sm text-slate-500 mb-6">
              Who is participating in the meeting or writing memos.
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Document</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Project Plan</TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>Dec 20, 2023</TableCell>
                  <TableCell className="text-right">
                    <Link className="underline text-blue-500" href="#">
                      View
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Requirement Doc</TableCell>
                  <TableCell>Jane Doe</TableCell>
                  <TableCell>Dec 25, 2023</TableCell>
                  <TableCell className="text-right">
                    <Link className="underline text-blue-500" href="#">
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
      {/* <footer className="px-10 bg-[#f8f9fa]">
        <Button className="mr-4" size="lg">
          Download All Documents
        </Button>
        <Button size="lg" variant="outline">
          Email Documents
        </Button>
      </footer> */}
    </div>
  );
}
