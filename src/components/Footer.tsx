// components/Footer.tsx
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-6 border-t border-gray-300 mt-12" style={{ backgroundColor: '#FFF0EB' }}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">© {new Date().getFullYear()} Your Name</p>
        <ul className="flex space-x-6">
          <li><Link href="https://twitter.com/jackoregankenny" className="text-gray-600 hover:text-[#0000FF]">Twitter</Link></li>
          <li><Link href="https://github.com/jackoregankenny" className="text-gray-600 hover:text-[#0000FF]">GitHub</Link></li>
        </ul>
      </div>
    </footer>
  );
}