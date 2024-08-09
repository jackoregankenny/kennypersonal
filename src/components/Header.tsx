import Link from 'next/link';

export function Header() {
  return (
    <header className="py-6 border-b border-gray-300 bg-[#FFF0EB]">
      <nav className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <Link href="/" className="text-2xl font-bold text-[#0000FF] mb-4 sm:mb-0">
          Jack O&apos;Regan Kenny
        </Link>
        <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 items-end sm:items-center w-full sm:w-auto">
          <li className="w-full sm:w-auto text-right">
            <Link href="/blog" className="text-gray-700 hover:text-[#0000FF] px-4 py-2 inline-block">Blog</Link>
          </li>
          <li className="w-full sm:w-auto text-right">
            <Link href="/about" className="text-gray-700 hover:text-[#0000FF] px-4 py-2 inline-block">About</Link>
          </li>
          <li className="w-full sm:w-auto text-right">
            <Link href="/resources" className="text-gray-700 hover:text-[#0000FF] px-4 py-2 inline-block">Resources</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}