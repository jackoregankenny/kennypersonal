// components/Header.tsx
import Link from 'next/link';

export function Header() {
  return (
    <header className="py-6 border-b border-gray-300" style={{ backgroundColor: '#FFF0EB' }}>
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[#0000FF]">
          Jack O&apos;Regan Kenny
        </Link>
        <ul className="flex space-x-8">
          <li><Link href="/blog" className="text-gray-700 hover:text-[#0000FF]">Blog</Link></li>
          <li><Link href="/about" className="text-gray-700 hover:text-[#0000FF]">About</Link></li>
          <li><Link href="/resources" className="text-gray-700 hover:text-[#0000FF]">Resources</Link></li>
        </ul>
      </nav>
    </header>
  );
}