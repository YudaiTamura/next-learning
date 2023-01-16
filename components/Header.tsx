import Link from "next/link";

const Header = () => {
  return (
    <header>
      <nav className="bg-gray-900 w-screen">
        <ul className="flex items-center pl-8 h-14">
          <li className="flex space-x-4">
            <Link href="/">
              <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">Home</a>
            </Link>
          </li>
          <li className="flex space-x-4">
            <Link href="/blogs">
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
  );
};

export default Header;
