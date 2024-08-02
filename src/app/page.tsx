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
      <header className="flex items-center mb-12">
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
          <p className="text-xl text-gray-600">Currently on sabbatical</p>
        </div>
      </header>

      <section className="mb-8">
        <p className="text-gray-800 text-lg leading-relaxed">
          Hey there! I&apos;m currently taking some time off to recharge and explore new ideas. 
          Before I was lecturing at <Link href="https://www.software-engineering.ie" className="text-[#0000FF] hover:underline">ISE</Link>, prior to that I was MD at <Link href="https://joinpatch.org" className="text-[#0000FF] hover:underline">Patch</Link> , CEO at Mirr and Engineer in Residence at the NDRC/Dogpatchlabs
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#0000FF]">Recent Thoughts</h2>
        <ul className="space-y-4">
          <li>
            <Link href="/blog/post-1" className="text-lg text-gray-800 hover:text-[#0000FF]">
              Reflections on AI Safety and Ethics
            </Link>
          </li>
          <li>
            <Link href="/blog/post-2" className="text-lg text-gray-800 hover:text-[#0000FF]">
              The Importance of Taking Breaks in Tech
            </Link>
          </li>
          <li>
            <Link href="/blog/post-3" className="text-lg text-gray-800 hover:text-[#0000FF]">
              What I&apos;ve Learned During My Sabbatical
            </Link>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-[#0000FF]">Let&apos;s Connect</h2>
        <p className="text-gray-800 mb-4">
          While I&apos;m taking a break, I&apos;m always open to interesting conversations. Feel free to reach out!
        </p>
        <Link href="mailto:your.email@example.com" className="inline-block bg-[#0000FF] text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
          Say Hello
        </Link>
      </section>
    </div>
  );
}