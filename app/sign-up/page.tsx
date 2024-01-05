import { SignUp } from "@clerk/nextjs";

type Params = {
  slug: string;
};

export default async function Page({ params }: { params: Params }) {
  const { slug } = params;
  return (
    <div>
      <SignUp afterSignUpUrl={`/portal/${slug}`} />
    </div>
  );
}
