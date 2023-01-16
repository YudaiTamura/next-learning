import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";

export default function Layout({
  children,
  title = "Web Page by Nextjs",
  displayHeader = true,
}: {
  children: React.ReactNode;
  title: string;
  displayHeader?: boolean;
}) {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-white font-mono bg-gray-800">
      <Head>
        <title>{title}</title>
      </Head>
      {displayHeader ? <Header /> : <></>}
      <main className="flex flex-1 justify-center items-center flex-col w-screen">{children}</main>
      <footer className="w-full h-12 flex justify-center items-center border-t">
        <a
          className="flex items-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  );
}
