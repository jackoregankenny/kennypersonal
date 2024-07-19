import { getPostData } from '@/lib/api';
import { parseContent } from '@/lib/contentParser';
import BlogPostContent from '@/components/BlogPostContent';
import { LinkPreviewWrapper } from '@/components/LinkPreviewWrapper';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug);

  if (!postData || !postData.content) {
    return <div>Error: Post not found</div>;
  }

  const { contentHtml, headings, footnotes } = await parseContent(postData.content);

  return (
    <>
      <BlogPostContent postData={postData} contentHtml={contentHtml} headings={headings} footnotes={footnotes} />
      <LinkPreviewWrapper />
    </>
  );
}

export async function generateStaticParams() {
  // Implement this function to generate static params for all your blog posts
  // For now, we'll return an empty array
  return [];
}