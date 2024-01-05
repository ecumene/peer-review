import * as z from "zod";

export const createMeetingSchema = z.object({
  title: z.string(),
  description: z.string(),
  dueDate: z.string(),
});

export const createAttendeeSchema = z.object({
  meetId: z.number(),
  userId: z.string(),
});

export const removeAttendeeSchema = z.object({
  meetId: z.number(),
  userId: z.string(),
});
