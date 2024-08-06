// app/about/page.tsx
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Me | Jack O&apos;Regan Kenny",
  description: "I&apos;m Jack, an engineer and builder. Learn about my journey from teenage inventor to lecturer, and the projects I&apos;ve worked on along the way.",
  openGraph: {
    title: "Jack O&apos;Regan Kenny - Engineer &amp; Builder",
    description: "From patenting smart mirrors at 16 to lecturing at ISE, here&apos;s my story of building, learning, and teaching in tech.",
    images: [
      {
        url: 'https://jackoregankenny.com/og-image-about.jpg',
        width: 1200,
        height: 630,
        alt: "Jack O&apos;Regan Kenny - About Me",
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
          I&apos;m Jack, an engineer who&apos;s been building stuff since I was a teenager. I&apos;ve been very lucky to work a few jobs that have been incredibly rewarding.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#0000FF]">My Journey</h2>
        <ul className="space-y-4 text-gray-800 text-lg">
          <li>
            <strong>Lecturer at ISE:</strong> I supported the Immersive Software Engineering program, teaching hardware, 3D printing, communications, and computer architecture as part of an AWS fellowship.
          </li>
          <li>
            <strong>MD at Patch:</strong> I ran the nonprofit accelerator, growing it to its largest cohort. I organized our first international trips and brought in sponsorship.
          </li>
          <li>
            <strong>CEO at Mirr:</strong> I built first-of-its-kind touchscreen smart mirrors, starting with a patent when I was 16.
          </li>
          <li>
            <strong>Engineer in Residence at NDRC/Dogpatchlabs:</strong> I built internal tools and supported due diligence for emerging tech startups.
          </li>
          <li>
            <strong>Contract Engineer for 6W:</strong> [Your role and achievements here]
          </li>
          <li>
            <strong>Founder at VC Hunt:</strong> [Your experience and focus here]
          </li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#0000FF]">What I&apos;m Into</h2>
        <p className="text-gray-800 text-lg leading-relaxed">
          I&apos;m really passionate about building physical things. If you&apos;re into that too, or have some cool ideas you want to bounce around, I&apos;d love to chat!
        </p>
      </section>
    </div>
  );
}