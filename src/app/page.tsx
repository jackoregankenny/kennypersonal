// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Jack O'Regan Kenny's personal site. Discover my thoughts, projects, and tools.",
  openGraph: {
    title: "Jack O'Regan Kenny - Personal Site",
    description: "Welcome to Jack O'Regan Kenny's personal site. Discover my thoughts, projects, and tools.",
    images: [
      {
        url: 'https://jackoregankenny.com/og-image-home.jpg',
        width: 1200,
        height: 630,
        alt: "Jack O'Regan Kenny",
      },
    ],
  },
};

export default function Home() {
  return (
    <div className="container mx-auto sm:mt-12 px-4 py-12 max-w-2xl">
      <header className="flex items-center mb-16">
        <div className="mr-6">
          <Image 
            src="/image.png" 
            alt="Your Name" 
            width={100} 
            height={100} 
            className="rounded-full"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#0000FF] mb-2">Hi, I&apos;m Jack O&apos;Regan Kenny</h1>
        </div>
      </header>

      <section className="space-y-8 mb-16">
        <p className="text-gray-800 text-lg leading-relaxed">
          Right now I&apos;m unemployed and loving it, last month I finished lecturing at the <Link href="https://softwareengineering.ie" className="text-[#0000FF] hover:underline">ISE</Link> at UL
        </p>
        <p className="text-gray-800 text-lg leading-relaxed">
          Previously I was MD at <Link href="https://joinpatch.org" className="text-[#0000FF] hover:underline">Patch</Link>, Engineer in Resident at <Link href="https://dogpatchlabs.com" className="text-[#0000FF] hover:underline">Dogpatch Labs</Link>/ <Link href="https://ndrc.ie" className="text-[#0000FF] hover:underline">NDRC</Link> and CEO at Mirr
        </p>
        <p className="text-gray-800 text-lg leading-relaxed">
          Thinking about starting something new email me if you wanna build some hardware
        </p>
      </section>

      <section>
        <p className="text-gray-800 text-lg">
          Get in touch: <Link href="mailto:jackoregankenny@gmail.com" className="text-[#0000FF] hover:underline">jackoregankenny at gmail dot com</Link>
        </p>
      </section>
    </div>
  );
}