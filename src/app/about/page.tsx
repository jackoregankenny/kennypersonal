// app/about/page.tsx
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Jack O'Regan Kenny, his background, interests, and what drives him to put things on the internet.",
  openGraph: {
    title: "About Jack O'Regan Kenny",
    description: "Learn more about Jack O'Regan Kenny, his background, interests, and what drives him to put things on the internet.",
    images: [
      {
        url: 'https://jackoregankenny.com/og-image-about.jpg',
        width: 1200,
        height: 630,
        alt: "About Jack O'Regan Kenny",
      },
    ],
  },
};

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-[#0000FF] mb-6">About Me</h1>

      <section className="mb-8">
        <p className="text-gray-800 text-lg leading-relaxed mb-4">
          Hi, I&apos;m Jack O&apos;Regan Kenny. I&apos;ve always been fascinated by technology and its potential to shape our world. My journey in tech has been a diverse and exciting one, filled with opportunities to learn, create, and lead.
        </p>
        <p className="text-gray-800 text-lg leading-relaxed mb-4">
          Currently, I&apos;m on a sabbatical, taking time to recharge, reflect, and explore new ideas. It&apos;s a period of personal growth and discovery that I believe will fuel my next ventures.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#0000FF]">Professional Experience</h2>
        <ul className="space-y-4 text-gray-800 text-lg">
          <li>
            <strong>Lecturer at ISE:</strong> Shared my knowledge and experience with the next generation of software engineers.
          </li>
          <li>
            <strong>MD at Patch:</strong> Led a team dedicated to creating innovative solutions in the tech space.
          </li>
          <li>
            <strong>CEO at Mirr:</strong> Spearheaded the development of cutting-edge technology products.
          </li>
          <li>
            <strong>Engineer in Residence at NDRC/Dogpatchlabs:</strong> Mentored and guided emerging tech startups.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#0000FF]">Interests and Passions</h2>
        <p className="text-gray-800 text-lg leading-relaxed">
          Beyond my professional work, I&apos;m deeply interested in AI safety and ethics, the future of work, and the impact of technology on society. I believe in the power of continuous learning and often find myself exploring new fields and ideas.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-[#0000FF]">Get in Touch</h2>
        <p className="text-gray-800 mb-4">
          I&apos;m always open to interesting conversations and collaborations. If you&apos;d like to discuss technology, share ideas, or just say hello, feel free to reach out!
        </p>
        <Link href="mailto:your.email@example.com" className="inline-block bg-[#0000FF] text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
          Connect with Me
        </Link>
      </section>
    </div>
  );
}