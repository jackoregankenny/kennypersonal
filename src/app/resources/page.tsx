// app/resources/page.tsx
import Link from 'next/link';

const resources = [
  { title: "Anthropic", url: "https://www.anthropic.com" },
  { title: "OpenAI", url: "https://www.openai.com" },
  { title: "DeepMind", url: "https://www.deepmind.com" },
  { title: "Google AI", url: "https://ai.google" },
  { title: "MIT Technology Review", url: "https://www.technologyreview.com" },
];

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#0000FF]">Resources</h1>
      <ul className="space-y-4">
        {resources.map((resource, index) => (
          <li key={index}>
            <Link href={resource.url} className="text-[#0000FF] hover:underline">
              {resource.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}