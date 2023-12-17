export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="flex justify-between items-center px-8 py-4">
        <h1 className="text-2xl font-bold">PeerReview</h1>
      </header>
      {children}
    </>
  );
}
