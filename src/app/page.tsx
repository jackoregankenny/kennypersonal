// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <header className="flex items-center mb-12">
        <div className="mr-6">
          <Image 
            src="/your-image.jpg" 
            alt="Your Name" 
            width={100} 
            height={100} 
            className="rounded-full"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#0000FF] mb-2">Your Name</h1>
          <p className="text-xl text-gray-600">Currently on sabbatical</p>
        </div>
      </header>

      <section className="mb-8">
        <p className="text-gray-800 text-lg leading-relaxed">
          Hey there! I'm currently taking some time off to recharge and explore new ideas. 
          Before my sabbatical, I was working at <Link href="https://www.anthropic.com" className="text-[#0000FF] hover:underline">Anthropic</Link>, 
          where I focused on AI development and ethics.
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
              What I've Learned During My Sabbatical
            </Link>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-[#0000FF]">Let's Connect</h2>
        <p className="text-gray-800 mb-4">
          While I'm taking a break, I'm always open to interesting conversations. Feel free to reach out!
        </p>
        <Link href="mailto:your.email@example.com" className="inline-block bg-[#0000FF] text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
          Say Hello
        </Link>
      </section>
    </div>
  );
}