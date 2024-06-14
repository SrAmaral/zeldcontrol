import { Suspense } from "react";
import SessionData from "~/components/Session/SessionData";
import { getServerAuthSession } from "~/server/auth";
import Layout from "../../layout/layout";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  const session = await getServerAuthSession();

  console.log(session);
  // if (!session) {
  //   redirect("/");
  // }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SessionData session={session} />
      <Layout>{children}</Layout>
    </Suspense>
  );
}
