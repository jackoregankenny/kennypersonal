// components/Header.tsx
import Link from 'next/link';

export function Header() {
  return (
    <header className="py-6 border-b border-gray-300 bg-[#FFF0EB]">
      <nav className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[#0000FF] mb-4 sm:mb-0">
          Jack O&apos;Regan Kenny
        </Link>
        <ul className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 w-full sm:w-auto sm:ml-auto items-end sm:items-center">
          <li><Link href="/blog" className="text-gray-700 hover:text-[#0000FF]">Blog</Link></li>
          <li><Link href="/about" className="text-gray-700 hover:text-[#0000FF]">About</Link></li>
          <li><Link href="/resources" className="text-gray-700 hover:text-[#0000FF]">Resources</Link></li>
        </ul>
      </nav>
    </header>
  );
}
