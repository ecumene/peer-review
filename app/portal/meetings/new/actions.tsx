"use server";

import { db } from "@/app/db";
import { meets } from "@/app/schema";
import { createMeetingSchema } from "@/lib/zod";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export async function createMeeting(
  meetingDetails: z.infer<typeof createMeetingSchema>
) {
  const user = (await currentUser())!;
  const parsed = createMeetingSchema.parse(meetingDetails);
  console.log(parsed.dueDate);
  await db.insert(meets).values([
    {
      title: parsed.title,
      description: parsed.description,
      dueDate: new Date(parsed.dueDate),
      creatorId: user.id,
    },
  ]);

  redirect("/portal/meetings");
}
