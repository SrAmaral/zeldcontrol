import { redirect } from "next/navigation";
import { Suspense } from "react";
import SessionData from "~/components/Session/SessionData";
import { getServerAuthSession } from "~/server/auth";
import Layout from "../../layout/layout";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SessionData session={session} />
      <Layout>{children}</Layout>
    </Suspense>
  );
}
