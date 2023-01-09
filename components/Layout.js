import Head from "next/head";
import Link from "next/link";

export default function Layout({ children, title = "HP by Nextjs" }) {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 text-sm font-mono">
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav className="bg-gray-800 w-screen">
          <ul className="flex items-center pl-8 h-14">
            <li className="flex space-x-4">
              <Link href="/">
                <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">Home</a>
              </Link>
            </li>
            <li className="flex space-x-4">
              <Link href="/blog">
                <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">Blog</a>
              </Link>
            </li>
            <li className="flex space-x-4">
              <Link href="/contact">
                <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">Contact</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex flex-1 justify-center items-center flex-col w-screen">{children}</main>
    </div>
  );
}
