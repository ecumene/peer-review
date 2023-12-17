import * as z from "zod";

export const createMeetingSchema = z.object({
  title: z.string(),
  description: z.string(),
  dueDate: z.string(),
  // invitees: z.array(z.string()).optional(),
});
