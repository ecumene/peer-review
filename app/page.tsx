import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import clsx from "clsx";

export default function Component() {
  return (
    <>
      <header className="flex justify-between items-center px-8 py-4">
        <h1 className="text-2xl font-bold">PeerReview</h1>
        <div className="flex space-x-4">
          <SignUpButton afterSignUpUrl="/portal/meetings">
            <Button variant="outline">Sign Up</Button>
          </SignUpButton>
          <SignInButton afterSignInUrl="/portal/meetings">
            <Button className="hover:bg-gray-200 transition-colors duration-200">
              Sign In
            </Button>
          </SignInButton>
        </div>
      </header>
      <section className="w-full py-24 px-8">
        <div className="container mx-auto flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Boss like Bezos
            </h2>
            <p className="mx-auto max-w-lg text-gray-500 md:text-lg dark:text-gray-400">
              Sync executive memos for an Async world
            </p>
          </div>
          <Link className={clsx("w-40", buttonVariants())} href="/sign-up">
            Get Started
          </Link>
        </div>
      </section>
    </>
  );
}
