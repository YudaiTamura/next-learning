import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

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
      <Footer />
    </div>
  );
}
