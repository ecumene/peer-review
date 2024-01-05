"use server";

import { db } from "@/app/db";
import { meets } from "@/app/schema";
import { slugOrgGuard } from "@/lib/auth-utils";
import { createMeetingSchema } from "@/lib/zod";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function createMeeting(
  slug: string,
  meetingDetails: z.infer<typeof createMeetingSchema>
) {
  const user = (await currentUser())!;
  const org = await slugOrgGuard(user.id, slug);
  const parsed = createMeetingSchema.parse(meetingDetails);
  const [meet] = await db
    .insert(meets)
    .values([
      {
        title: parsed.title,
        description: parsed.description,
        orgId: org.id,
        dueDate: new Date(parsed.dueDate),
        creatorId: user.id,
      },
    ])
    .returning();

  redirect(`/portal/${slug}/${meet.id}`);
}
