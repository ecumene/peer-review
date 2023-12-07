/**
 * v0 by Vercel.
 * @see https://v0.dev/t/2gm5esLqzkz
 */
import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Accordion,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Avatar } from "@/components/ui/avatar";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  return (
    <>
      <header className="flex justify-between items-center px-8 py-4">
        <h1 className="text-2xl font-bold">PeerReview</h1>
      </header>
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
            <h2 className="text-2xl font-bold">Upcoming Meetings</h2>
            <div className="grid gap-4">
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar
                      alt="User avatar"
                      className="w-10 h-10 rounded-full"
                      src="/placeholder.svg"
                    />
                    <div>
                      <CardTitle className="text-lg font-bold">
                        Business Meeting
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-500">
                        With John Doe
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      5th December 2023, 10:00 AM
                    </p>
                  </div>
                  <div>
                    <Badge className="px-2 py-1 text-xs text-white bg-blue-500 rounded">
                      Business
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar
                      alt="User avatar"
                      className="w-10 h-10 rounded-full"
                      src="/placeholder.svg"
                    />
                    <div>
                      <CardTitle className="text-lg font-bold">
                        Education Webinar
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-500">
                        With Jane Smith
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      7th December 2023, 2:00 PM
                    </p>
                  </div>
                  <div>
                    <Badge className="px-2 py-1 text-xs text-white bg-green-500 rounded">
                      Education
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function CalendarDaysIcon(props) {
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
