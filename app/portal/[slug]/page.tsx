import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Accordion,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { db } from "../../db";
import { currentUser } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Meet, MeetUser, meets } from "@/app/schema";
import UserList from "@/components/ui/user-list";
import { Suspense } from "react";
import { eq, not } from "drizzle-orm";
import { slugOrgGuard } from "@/lib/auth-utils";

const meetingList = (list: (Meet & { users: MeetUser[] })[]) =>
  list.map((meet) => (
    <Card key={meet.id} className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div>
            <CardTitle className="text-lg font-bold">{meet.title}</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              {meet.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href={`/portal/meetings/${meet.id}`}
            className={buttonVariants()}
          >
            Details
          </Link>
          <p className="text-sm text-gray-500">
            {meet.dueDate.toLocaleDateString("en-us", {
              hour: "numeric",
              minute: "numeric",
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        <Suspense fallback={<UserList.Skeleton number={meet.users.length} />}>
          <UserList ids={meet.users.map(({ userId }) => userId)} />
        </Suspense>
      </CardContent>
    </Card>
  ));

type Params = {
  slug: string;
};

export default async function Page({ params }: { params: Params }) {
  const { slug } = params;

  const user = (await currentUser())!;
  const org = await slugOrgGuard(user.id, slug);

  const orgMeetings = await db.query.meets.findMany({
    where: (meets, { eq }) => eq(meets.orgId, org.id),
    with: { users: true },
  });

  const attending = orgMeetings.filter((m) => m.creatorId !== user.id);
  const createdByYou = orgMeetings.filter((m) => m.creatorId === user.id);

  return (
    <>
      <section className="container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 md:gap-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold">Filters</h2>
            <div className="grid gap-2">
              <Accordion className="w-full" collapsible type="single">
                <AccordionItem value="type">
                  <AccordionTrigger className="text-base">
                    Meeting Type
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-2">
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="type-business" />
                        Business{"\n                                  "}
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="type-personal" />
                        Personal{"\n                                  "}
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="type-education" />
                        Education{"\n                                  "}
                      </Label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="date">
                  <AccordionTrigger className="text-base">
                    Date
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            className="w-full justify-start text-left font-normal"
                            variant="outline"
                          >
                            <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
                            Pick a date
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                          <Calendar
                            initialFocus
                            mode="range"
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          <div className="grid gap-6">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold">Your Meetings</h2>
              <Link href="/portal/meetings/new" className={buttonVariants()}>
                Schedule a new meeting
                <CalendarDaysIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4">
              {orgMeetings.length === 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>No Upcoming Meetings</CardTitle>
                    <CardDescription>
                      It looks like you don&apos;t have any meetings scheduled.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center space-y-4">
                    <p className="text-center text-gray-500">
                      When you have meetings, you&apos;ll see them here.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-center p-4">
                    <Link
                      href="/portal/meetings/new"
                      className={buttonVariants()}
                    >
                      Schedule a new meeting
                      <CalendarDaysIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </CardFooter>
                </Card>
              )}
              {createdByYou.length !== 0 && (
                <>
                  <div className="w-full text-sm flex text-gray-800">
                    created by you
                    <hr className="flex-1 border-current my-auto ml-2" />
                  </div>
                  {meetingList(createdByYou)}
                </>
              )}
              {attending.length !== 0 && (
                <>
                  <div className="w-full text-sm flex text-gray-800">
                    attending
                    <hr className="flex-1 border-current my-auto ml-2" />
                  </div>
                  {meetingList(attending)}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// todo: remove this
function CalendarDaysIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}
