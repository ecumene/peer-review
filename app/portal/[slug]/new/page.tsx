import CreateAMeeting from "@/components/forms/create-meeting";
import { createMeeting } from "./actions";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <Card className="space-y-8">
        <CardHeader>
          <h2 className="text-3xl font-bold">Schedule a Meeting</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Fill out the form below to schedule your meeting.
          </p>
        </CardHeader>
        <CardContent>
          <CreateAMeeting onSubmit={createMeeting} />
        </CardContent>
      </Card>
    </div>
  );
}
