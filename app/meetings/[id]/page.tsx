import { db, meets } from "@/app/db";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page(props: Props) {
  const id = parseInt(props.params.id);
  if (!id) return <>Invalid ID provided</>;
  const [meeting] = await db.select().from(meets).where(eq(meets.id, id));

  if (!meeting) return notFound();

  return <div>{meeting.description}</div>;
}
