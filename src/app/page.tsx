import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <h1>Zeld Control</h1>
      <Link href="/login">Login</Link>
    </main>
  );
}
