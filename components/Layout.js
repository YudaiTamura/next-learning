import Head from "next/head";
import Link from "next/link";

export default function Layout({ children, title = "HP by Nextjs" }) {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 text-sm font-mono">
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav className="bg-gray-800 w-screen"></nav>
      </header>
      <main className="flex flex-1 justify-center items-center flex-col w-screen">{children}</main>
    </div>
  );
}
