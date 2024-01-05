"use server";

import { db } from "@/app/db";
import { meetUsers, meets } from "@/app/schema";
import { slugOrgGuard } from "@/lib/auth-utils";
import { createAttendeeSchema, removeAttendeeSchema } from "@/lib/zod";
import { currentUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createAttendee = async (
  slug: string,
  attendeeDetails: z.infer<typeof createAttendeeSchema>
) => {
  const user = (await currentUser())!;
  const org = await slugOrgGuard(user.id, slug);
  const { meetId, userId } = createAttendeeSchema.parse(attendeeDetails);
  const meeting = await db.query.meets.findFirst({
    where: eq(meets.id, meetId),
  });

  if (!meeting || meeting.orgId !== org.id)
    throw new Error("Meeting does not belong to user's org.");

  await db.insert(meetUsers).values({ meetId, userId }).returning();

  revalidatePath(`portal/hello-world/${meetId}`);
};

export const removeAttendee = async (
  slug: string,
  attendeeDetails: z.infer<typeof removeAttendeeSchema>
) => {
  const user = (await currentUser())!;
  const org = await slugOrgGuard(user.id, slug);
  const { meetId, userId } = removeAttendeeSchema.parse(attendeeDetails);
  const meeting = await db.query.meets.findFirst({
    where: eq(meets.id, meetId),
  });

  if (!meeting || meeting.orgId !== org.id)
    throw new Error("Meeting does not belong to user's org.");

  await db
    .delete(meetUsers)
    .where(and(eq(meetUsers.userId, userId), eq(meetUsers.meetId, meetId)));

  revalidatePath(`portal/hello-world/${meetId}`);
};
