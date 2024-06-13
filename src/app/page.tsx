import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <h1>zeld Control</h1>
      <Link href="/login">Login</Link>
    </main>
  );
}
