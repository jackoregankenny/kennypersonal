// components/Footer.tsx
import Link from 'next/link';
import LastUpdatedFooter from './LastUpdated';

export function Footer() {
  return (
    <footer className="py-6 border-t border-gray-300 mt-28" style={{ backgroundColor: '#FFF0EB' }}>
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-600 mb-4 md:mb-0">© {new Date().getFullYear()} Jack O&apos;Regan Kenny</p>
        <LastUpdatedFooter/>
        <ul className="flex space-x-6">
          <li><Link href="https://twitter.com/jackoregankenny" className="text-gray-600 hover:text-[#0000FF]">Twitter</Link></li>
          <li><Link href="https://github.com/jackoregankenny" className="text-gray-600 hover:text-[#0000FF]">GitHub</Link></li>
        </ul>
      </div>
    </footer>
  );
}