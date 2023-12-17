"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { useOrganization } from "@clerk/nextjs";
import { createMeetingSchema } from "@/lib/zod";

export type FormData = z.infer<typeof createMeetingSchema>;

type Props = {
  onSubmit: (data: FormData) => Promise<void>;
  defaultValues?: FormData;
  submitText?: string;
};

export default function CreateAMeeting({
  onSubmit,
  defaultValues,
  submitText = "Schedule Meeting",
}: Props) {
  const { memberships } = useOrganization({ memberships: {} });
  //memberships.data has the user list

  const form = useForm<FormData>({
    defaultValues,
    resolver: zodResolver(createMeetingSchema),
  });

  const handleSubmit = async (data: any) => {
    await onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel htmlFor="meeting-title">Title</FormLabel>
              <FormDescription>
                This is the title of your meeting
              </FormDescription>
              <FormControl>
                <Input
                  id="meeting-title"
                  placeholder="Enter meeting title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel htmlFor="meeting-description">Description</FormLabel>
              <FormDescription>Your meeting&apos;s description</FormDescription>
              <FormControl>
                <Textarea
                  className="min-h-[100px]"
                  id="meeting-description"
                  placeholder="Enter meeting description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel htmlFor="due-date">Due Date</FormLabel>
              <FormDescription>
                The due date for memos in this meeting
              </FormDescription>
              <FormControl>
                <Input id="due-date" type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="invitees"
          disabled
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel htmlFor="invitees">Invitees</FormLabel>
              <FormDescription>Invitees to this meeting</FormDescription>
              <FormControl>
                <Input id="invitees" placeholder="Enter invitees" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{submitText}</Button>
      </form>
    </Form>
  );
}
