import Link from 'next/link';
import { getSortedPostsData } from '@/lib/api';

export default function BlogIndex() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <ul className="space-y-4">
        {allPostsData.map(({ slug, date, title }) => (
          <li key={slug} className="border-b pb-4">
            <Link href={`/blog/${slug}`} className="text-xl font-semibold hover:text-blue-600">
              {title}
            </Link>
            <br />
            <small className="text-gray-500">{date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}