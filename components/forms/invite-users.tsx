"use client";

import { createAttendeeSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";

export type FormData = z.infer<typeof createAttendeeSchema>;

type Props = {
  onSubmit: (slug: string, data: FormData) => Promise<void>;
  meetId: number;
  users: {
    id: string;
    imageUrl: string | null;
    firstName: string | null;
    lastName: string | null;
  }[];
  defaultValues?: FormData;
  submitText?: string;
};

export default function InviteUser({
  onSubmit,
  meetId,
  defaultValues,
  users,
  submitText = "Add",
}: Props) {
  const { slug } = useParams<{ slug: string }>();
  const form = useForm<FormData>({
    defaultValues: {
      ...defaultValues,
      meetId,
    },
    resolver: zodResolver(createAttendeeSchema),
  });

  const handleSubmit = async (data: FormData) => {
    form.reset();
    await onSubmit(slug, data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel htmlFor="due-date">User Select</FormLabel>
              <FormDescription>Select a user</FormDescription>
              <FormControl>
                <div className="flex gap-4">
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="flex-1">
                      {field.value ? (
                        <SelectValue placeholder="Select a user" />
                      ) : (
                        "Select a user"
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      {users.map(({ id, imageUrl, firstName, lastName }) => (
                        <SelectItem key={id} value={id}>
                          <div className="flex items-center">
                            {imageUrl ? (
                              <img src={imageUrl} className="w-6 mr-2" />
                            ) : (
                              <div className="w-6 mr-2" />
                            )}
                            {firstName} {lastName}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button type="submit">{submitText}</Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
