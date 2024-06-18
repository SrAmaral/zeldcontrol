import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();
  return (
    <main>
      <h1>Zeld Control</h1>
      <Link href="/login">Login</Link>
      <p>{JSON.stringify(session)}</p>
    </main>
  );
}
